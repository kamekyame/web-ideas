'use strict';

const group = ["未分類"];
addGroupTable(group[0]);

const ideas = [];

init();

function init() {
    document.getElementById("idea-form").addEventListener("submit", addIdea);
    document.getElementById("group-form").addEventListener("submit", addGroup);
}

function addIdea(event) {
    console.log(event);
    const ideaTextbox = document.getElementById("idea-textbox");
    const ideaText = ideaTextbox.value;
    const ideaTextboxNote = document.getElementById("idea-textbox-note");

    if (ideaText === "") {
        ideaTextboxNote.textContent = "アイデアを入力してください";
    } else if (ideas.some(e => e === ideaText)) {
        ideaTextboxNote.textContent = "既に出たアイデアです";
    } else {
        ideaTextboxNote.textContent = "";

        ideas.push(ideaText);

        // 要素作成
        const table = document.getElementById(`group-${group[0]}`);
        const div = document.createElement("div");
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        const text = document.createElement("h5");
        text.textContent = ideaText;
        div.appendChild(text);

        const select = document.createElement("select");
        select.classList.add("group-select");
        select.onchange = changeGroup;
        group.forEach((item, i) => select.add(new Option(item, i)));
        div.appendChild(select);

        const removeBtn = document.createElement("Button");
        removeBtn.textContent = "削除";
        removeBtn.onclick = removeIdea;
        div.appendChild(removeBtn);

        td.appendChild(div);
        tr.appendChild(td);
        table.appendChild(tr);
    }
    ideaTextbox.value = "";
    ideaTextbox.focus();

    event.preventDefault();
}

function removeIdea(event) {
    console.log(event, "removeIdea");
    const table = event.path.find(e => e.tagName === "TABLE");
    const removeElement = event.path.find(e => e.tagName === "TR");
    const removeIdeaText = event.path.find(e => e.tagName === "DIV").getElementsByTagName("H5")[0].textContent;

    table.removeChild(removeElement);

    const index = ideas.findIndex((e) => e === removeIdeaText);
    ideas.splice(index, 1);
}

function changeGroup(event) {
    //console.log(event,"changeGroup");

    // 移動先のテーブル取得
    const lastGroupName = event.srcElement.selectedOptions[0].text;
    const lastTable = document.getElementById(`group-${lastGroupName}`);

    // 移動する要素取得
    const moveElement = event.path.find(e => e.tagName === "TR");

    lastTable.appendChild(moveElement);
}



function addGroup(event) {
    const groupTextbox = document.getElementById("group-textbox");
    const groupText = groupTextbox.value;
    const groupTextboxNote = document.getElementById("group-textbox-note");
    if (groupText === "") {
        groupTextboxNote.textContent = "グループ名を入力してください";
    } else if (group.some(e => e === groupText)) {
        groupTextboxNote.textContent = "既に存在するグループです";
    }
    else {
        group.push(groupText);
        groupTextboxNote.textContent = "";
        addGroupTable(groupText);
    }

    groupTextbox.value = "";
    groupTextbox.focus();

    event.preventDefault();
}

function removeGroup(event) {

    console.log(event);
    const div = event.path.find(e => e.classList.contains("group-div"));
    const table = div.getElementsByTagName("TABLE")[0];
    console.log(table);
    const ideas = table.childNodes;

    const ungroupedTable = document.getElementById(`group-${group[0]}`);
    for (let i = table.childNodes.length - 1; i >= 0; i--) {
        ungroupedTable.appendChild(table.childNodes[i]);
    }

    console.log((div));
    //const divParent = div.path.find(e => (e.tagName === "DIV" && e.id === "ideas-area"));
    div.parentNode.removeChild(div);
    //divParent.removeChild(div);
    console.log(event.toElement);

    const groupName = table.id.match("^group-(.+)$")[1];

    const index = group.findIndex((e) => e === groupName);
    group.splice(index, 1);

    removeOption(groupName);
    //group.find(e => e === table.id.match("^group-(.+)$"));

}

function addGroupTable(groupName) {
    const ideasArea = document.getElementById("ideas-area");

    const div = document.createElement("div");
    div.classList.add("group-div");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("group-title-div");
    div.appendChild(titleDiv);
    const title = document.createElement("h3");
    title.textContent = groupName;
    titleDiv.appendChild(title);

    if (groupName !== group[0]) {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "削除";
        removeBtn.onclick = removeGroup;
        //removeBtn.setAttribute("onclick", "removeGroup(event)");
        titleDiv.appendChild(removeBtn);
    }

    const table = document.createElement("table");
    table.id = `group-${groupName}`;
    table.classList.add("group-table");

    div.appendChild(table);

    ideasArea.appendChild(div);

    const groupSelect = document.getElementsByClassName("group-select");
    for (let i = 0; i < groupSelect.length; i++) {
        groupSelect[i].add(new Option(groupName, groupSelect[i].options.length));
    }
}

function removeOption(groupName) {
    console.log(groupName);
    const groupSelect = document.getElementsByClassName("group-select");
    for (let i = 0; i < groupSelect.length; i++) {
        console.log(groupSelect[i].options);
        const options = Array.from(groupSelect[i].options);
        console.log(options);
        const index = options.findIndex((e) => e.text === groupName);
        console.log(index);
        groupSelect[i].remove(index);
    }
}