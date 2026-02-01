import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  doneTasks: Task[] = [];

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

  getPriorityClass(priority: string): string {
    return `priority-${priority.toLowerCase()}`;
  }
}
