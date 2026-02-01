import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskFormComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];
  isTaskFormOpen = false;
  taskToEdit: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.todoTasks = tasks.filter(t => t.status === 'TODO');
        this.inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');
        this.doneTasks = tasks.filter(t => t.status === 'DONE');
      },
      error: (err) => console.error('Error loading tasks:', err)
    });
  }

  drop(event: CdkDragDrop<Task[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      const task = event.container.data[event.currentIndex];
      task.status = newStatus as 'TODO' | 'IN_PROGRESS' | 'DONE';
      
      if (task.id) {
        this.taskService.updateTask(task.id, task).subscribe({
          next: () => console.log('Task updated successfully'),
          error: (err) => {
            console.error('Error updating task:', err);
            this.loadTasks();
          }
        });
      }
    }
  }

  editTask(task: Task, event: Event) {
    event.stopPropagation();
    this.taskToEdit = task;
    this.isTaskFormOpen = true;
  }

  deleteTask(task: Task, event: Event) {
    event.stopPropagation();
    if (task.id && confirm(`Are you sure you want to delete "${task.title}"?`)) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => {
          console.log('Task deleted successfully');
          this.loadTasks();
        },
        error: (err) => console.error('Error deleting task:', err)
      });
    }
  }

  saveTask(task: Task) {
    if (this.taskToEdit && this.taskToEdit.id) {
      this.taskService.updateTask(this.taskToEdit.id, task).subscribe({
        next: () => {
          console.log('Task updated successfully');
          this.closeTaskForm();
          this.loadTasks();
        },
        error: (err) => console.error('Error updating task:', err)
      });
    }
  }

  closeTaskForm() {
    this.isTaskFormOpen = false;
    this.taskToEdit = null;
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }
}
