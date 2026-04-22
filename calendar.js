document.addEventListener('DOMContentLoaded', () => {
  const monthYear = document.querySelector('.month');
  const daysContainer = document.querySelector('.days');
  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');

  let currentDate = new Date();
  let today = new Date();

  const renderCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // 1. Correctly format the Month/Year header
    monthYear.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    // 2. Clear the container BEFORE adding any days
    daysContainer.innerHTML = '';

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    // 3. Previous month's trailing dates
    for (let i = firstDayIndex; i > 0; i--) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = prevMonthLastDay - i + 1;
      dayDiv.classList.add('fade');
      daysContainer.appendChild(dayDiv);
    }

    // 4. Current month's dates
    for (let i = 1; i <= lastDay; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = i;
      if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayDiv.classList.add('today');
      }
      daysContainer.appendChild(dayDiv);
    }

    // 5. Next month's leading dates (to fill the 7-column grid)
    const lastDayIndex = new Date(year, month + 1, 0).getDay();
    const nextDays = 7 - lastDayIndex - 1;
    for (let i = 1; i <= nextDays; i++) {
      const dayDiv = document.createElement('div');
      dayDiv.textContent = i;
      dayDiv.classList.add('fade');
      daysContainer.appendChild(dayDiv);
    }
  };

  // 6. Move Event Listeners OUTSIDE the render function
  prevButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  renderCalendar(currentDate);
});