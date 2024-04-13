console.log("working...");

const candidate = document.querySelector("#candidate");
const candidateName = document.querySelector(".candidate_name");
const inputValues = document.querySelectorAll("#predict_input");
const result = document.querySelector(".result_predict");
const downloadImageBtn = document.querySelectorAll(
  ".download_container button"
)[0];
const downloadPDFBtn = document.querySelectorAll(
  ".download_container button"
)[1];
const table = document.querySelector(".election");

let total = 0;

downloadImageBtn.addEventListener("click", async (e) => {
  const canvas = await html2canvas(table);

  const imgData = canvas.toDataURL("image/png");

  // Create a link element
  const link = document.createElement("a");
  link.href = imgData;

  // Set the download attribute
  link.download = "result.png";

  // Trigger the download
  link.click();
});

candidate.addEventListener("change", (e) => {
  console.log(e.target.value);
  candidateName.innerHTML = e.target.value;
});

downloadPDFBtn.addEventListener("click", (e) => {
  var doc = new jspdf.jsPDF({
    orientation: "portrait",
    format: "a0",
  });

  // Convert table to a data URL representation
  doc.html(table, {
    callback: function (doc) {
      doc.save("result.pdf");
    },
  });
});

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

for (let i = 0; i < inputValues.length; i++) {
  inputValues[i].addEventListener("keyup", (e) => {
    const value = Number(e.target.value);
    const maxValue = Number(e.target.max);

    if (value > maxValue) {
      e.target.value = maxValue;
    }

    calculateTotalSeat();
  });
}

function calculateTotalSeat() {
  total = 0;
  for (var i = 0; i < inputValues.length; i++) {
    let value = inputValues[i].value;
    if (value === "") {
      value = 0;
    }

    total += Number(value);
  }

  result.innerHTML = total;
}
