import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { KanbanBoardComponent } from '../kanban-board/kanban-board.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CalendarViewComponent, KanbanBoardComponent, TaskFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeView: 'kanban' | 'calendar' | 'both' = 'both';
  isTaskFormOpen = false;
  taskToEdit: Task | null = null;

  constructor(private taskService: TaskService) {}

  setView(view: 'kanban' | 'calendar' | 'both') {
    this.activeView = view;
  }

  openTaskForm(task: Task | null = null) {
    this.taskToEdit = task;
    this.isTaskFormOpen = true;
  }

  closeTaskForm() {
    this.isTaskFormOpen = false;
    this.taskToEdit = null;
  }

  saveTask(task: Task) {
    if (this.taskToEdit && this.taskToEdit.id) {
      // Update existing task
      this.taskService.updateTask(this.taskToEdit.id, task).subscribe({
        next: () => {
          console.log('Task updated successfully');
          this.closeTaskForm();
          // Reload the dashboard components
          window.location.reload();
        },
        error: (err) => console.error('Error updating task:', err)
      });
    } else {
      // Create new task
      this.taskService.createTask(task).subscribe({
        next: () => {
          console.log('Task created successfully');
          this.closeTaskForm();
          // Reload the dashboard components
          window.location.reload();
        },
        error: (err) => console.error('Error creating task:', err)
      });
    }
  }
}

