import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); // Notifica al padre que se debe cerrar
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const modalElement = document.getElementById('modal');
    if (modalElement && !modalElement.contains(event.target as Node)) {
      this.closeModal();
    }
  }

}
