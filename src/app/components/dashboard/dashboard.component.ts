import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarViewComponent } from '../calendar-view/calendar-view.component';
import { KanbanBoardComponent } from '../kanban-board/kanban-board.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CalendarViewComponent, KanbanBoardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  activeView: 'kanban' | 'calendar' | 'both' = 'both';

  setView(view: 'kanban' | 'calendar' | 'both') {
    this.activeView = view;
  }
}
