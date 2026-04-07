/* App-specific styles */

/* Smooth transitions for page changes */
.page-transition-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-transition-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms, transform 300ms;
}

.page-transition-exit {
  opacity: 1;
}

.page-transition-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}

/* Custom focus styles */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 208, 156, 0.2);
  border-color: #00D09C;
}

/* Button hover effects */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.98);
}

/* Card hover lift effect */
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* Radio button custom styles */
[data-state="checked"] {
  border-color: #00D09C !important;
}

/* Scrollbar styling for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .gradient-green {
    background: linear-gradient(135deg, #00D09C 0%, #00A67E 100%);
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
}
