async function loadSchedule() {
  try {
    const response = await fetch(
      "https://christinavelgus.github.io/webTehnologies/Semester_2/Schedule/schedule.json"
    );
    const data = await response.json();
    displaySchedule(data.schedule);
  } catch (error) {
    console.log(error);
    document.getElementById("schedule").innerText =
      "Помилка завантаження розкладу.";
  }
}

function displaySchedule(schedule) {
  const scheduleContainer = document.getElementById("schedule");
  scheduleContainer.innerHTML = "";

  scheduleContainer.style.display = "grid";
  scheduleContainer.style.gridTemplateColumns = `repeat(${schedule.length}, 1fr)`;

  schedule.forEach((day) => {
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("day");

    const dateHeader = document.createElement("h3");
    dateHeader.innerText = `Дата: ${day.date}`;
    dayContainer.appendChild(dateHeader);

    day.lessonList.forEach((lesson) => {
      const lessonContainer = document.createElement("div");
      lessonContainer.classList.add("lesson");

      const subjectHeader = document.createElement("h4");
      subjectHeader.innerText = lesson.subject;
      lessonContainer.appendChild(subjectHeader);

      const timeInfo = document.createElement("p");
      timeInfo.innerText = `Час: ${lesson.time}`;
      lessonContainer.appendChild(timeInfo);

      const teacherInfo = document.createElement("p");
      teacherInfo.innerText = `Вчитель: ${lesson.teacher}`;
      lessonContainer.appendChild(teacherInfo);

      const classroomInfo = document.createElement("p");
      classroomInfo.innerText = `Клас: ${lesson.classroom}`;
      lessonContainer.appendChild(classroomInfo);

      dayContainer.appendChild(lessonContainer);
    });

    scheduleContainer.appendChild(dayContainer);
  });
}

loadSchedule();
