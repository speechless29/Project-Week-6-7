const API_URL = "http://localhost:3000/students";

window.onload = function () {
  loadStudents();
};

function loadStudents() {
  axios.get(API_URL).then((res) => {
    const list = document.getElementById("studentList");
    list.innerHTML = "";

    res.data.forEach((student) => {
      const li = document.createElement("li");
      li.innerHTML = `
          ${student.name} (${student.age})
          <button onclick="deleteStudent(${student.id})">Delete</button>
        `;
      list.appendChild(li);
    });
  });
}

function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;

  axios.post(API_URL, { name, age }).then(() => {
    loadStudents();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
  });
}

function deleteStudent(id) {
  axios.delete(`${API_URL}/${id}`).then(() => loadStudents());
}
