import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | null = null;
  @Input() isOpen = false;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  formData: Task = {
    title: '',
    description: '',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: undefined
  };

  isEditMode = false;

  ngOnInit() {
    if (this.task) {
      this.isEditMode = true;
      this.formData = { ...this.task };
      // Convert ISO string to date input format (YYYY-MM-DD)
      if (this.formData.dueDate) {
        this.formData.dueDate = this.formData.dueDate.split('T')[0];
      }
    }
  }

  onSubmit() {
    if (this.formData.title.trim()) {
      // Convert date to ISO format if provided
      if (this.formData.dueDate) {
        const date = new Date(this.formData.dueDate);
        this.formData.dueDate = date.toISOString();
      }
      this.save.emit(this.formData);
      this.resetForm();
    }
  }

  onCancel() {
    this.cancel.emit();
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      title: '',
      description: '',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: undefined
    };
    this.isEditMode = false;
  }
}
