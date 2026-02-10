const ESP_IP = "http://192.168.4.1";

export function sendStart(stonesArray) {
  fetch(`${ESP_IP}/cmd`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cmd: "START",
      stones: stonesArray
    })
  });
}




