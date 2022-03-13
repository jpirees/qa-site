const UserLogin = "admin";
const PassLogin = "admin";

var clients = JSON.parse(localStorage.getItem("clients")) || [];

LoadPage = () => {
  if (sessionStorage.getItem("qaUsername")) {
    LoadClientPage()
    LoadTable();
  }
  else {
    LoadLoginPage();
  }
}

Login = (username, password) => {
  if (username === UserLogin && password === PassLogin) {
    sessionStorage.setItem("qaUsername", username)
    LoadClientPage();
  } else {
    alert("Username or password incorrect.");
  }
}

Logout = () => { sessionStorage.clear(); location.reload(); }

LoadLoginPage = () => {
  ShowForm();
  HidePlatform();
  HideLogout();
}

LoadClientPage = () => {
  HideForm();
  ShowPlatform();
  ShowLogout();
}

Save = (name, cpf, address, city, state) => {

  cpf = (cpf.lenght == 11)
    ? MaskCPF(cpf)
    : cpf;

  let client = { cpf, name, address, city, state };

  clients.push(client);

  localStorage.setItem("clients", JSON.stringify(clients));

  ClearInputs();

  LoadItem(name, cpf, address, city, state);
}

LoadTable = () => {
  var tbody = document.querySelector("tbody");

  for (const [index, client] of clients.entries()) {

    var tr = document.createElement("tr");

    var tdCpf = document.createElement("td");
    tdCpf.append(document.createTextNode(client.cpf));

    var tdName = document.createElement("td");
    tdName.append(document.createTextNode(client.name));

    var tdAddress = document.createElement("td");
    tdAddress.append(document.createTextNode(client.address));

    var tdCity = document.createElement("td");
    tdCity.append(document.createTextNode(client.city));

    var tdState = document.createElement("td");
    tdState.append(document.createTextNode(client.state));

    var tdAction = document.createElement("td");

    var linkRemove = document.createElement("button");

    linkRemove.append(document.createTextNode("remove"));
    linkRemove.onclick = () => RemoveItem(index);
    tdAction.append(linkRemove);

    tr.append(tdCpf);
    tr.append(tdName);
    tr.append(tdAddress);
    tr.append(tdCity);
    tr.append(tdState);
    tr.append(tdAction);
    tbody.append(tr);
  }

}

LoadItem = (name, cpf, address, city, state) => {
  var tbody = document.querySelector("tbody");

  var tr = document.createElement("tr");

  var tdCpf = document.createElement("td");
  tdCpf.append(document.createTextNode(cpf));

  var tdName = document.createElement("td");
  tdName.append(document.createTextNode(name));

  var tdAddress = document.createElement("td");
  tdAddress.append(document.createTextNode(address));

  var tdCity = document.createElement("td");
  tdCity.append(document.createTextNode(city));

  var tdState = document.createElement("td");
  tdState.append(document.createTextNode(state));

  var tdAction = document.createElement("td");

  var linkRemove = document.createElement("button");

  linkRemove.append(document.createTextNode("remove"));
  linkRemove.onclick = () => RemoveItem(clients.lenght - 1);
  tdAction.append(linkRemove);

  tr.append(tdCpf);
  tr.append(tdName);
  tr.append(tdAddress);
  tr.append(tdCity);
  tr.append(tdState);
  tr.append(tdAction);
  tbody.append(tr);
}

RemoveItem = (index) => {
  clients.splice(index, 1);
  localStorage.setItem("clients", JSON.stringify(clients));
  location.reload();
}

ClearInputs = () => document.querySelectorAll('input').forEach(i => i.value = '');

ShowForm = () => document.querySelector("form").style.display = 'flex';
HideForm = () => document.querySelector("form").style.display = 'none';

ShowLogout = () => document.querySelector("#logout").style.display = 'block';
HideLogout = () => document.querySelector("#logout").style.display = 'none';

ShowPlatform = () => document.querySelector("#platform").style.display = 'flex';
HidePlatform = () => document.querySelector("#platform").style.display = 'none';