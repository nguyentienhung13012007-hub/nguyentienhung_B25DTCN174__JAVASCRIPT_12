
let guild = [
    { id: "W001", name: "Musashi", class: "Samurai", attack: 85, defense: 60 },
{ id: "W002", name: "Ragnar", class: "Viking", attack: 92, defense: 70 },
{ id: "W003", name: "Spartacus", class: "Gladiator", attack: 80, defense: 65 },
{ id: "W004", name: "Lancelot", class: "Knight", attack: 75, defense: 85 },
{ id: "W005", name: "Leonidas", class: "Spartan", attack: 88, defense: 72 }
];

const validClasses = ["Samurai", "Viking", "Gladiator", "Knight", "Spartan"];



const showGuild = () => {
    console.log("===== DANH SÁCH GUILD =====");
    if (guild.length === 0) {
        console.log("Guild đang trống.");
        return;
    }
    guild.forEach((w, i) => {
        console.log(`${i + 1}. ${w.id} | ${w.name} | ${w.class} | ATK: ${w.attack} | DEF: ${w.defense}`);
    });
};


const addWarrior = () => {
    let id = prompt("Nhập ID:");
    if (guild.some(w => w.id === id)) {
        console.log("ID đã tồn tại trong guild!");
        return;
    }

    let name = prompt("Nhập tên:");
    if (guild.some(w => w.name.toLowerCase() === name.toLowerCase())) {
        console.log("Tên chiến binh đã có trong guild.");
        return;
    }

    let warriorClass = prompt("Nhập class:");
    if (!validClasses.includes(warriorClass)) {
        console.log("Class không hợp lệ!");
        return;
    }

    let attack = +prompt("Nhập attack (1-100):");
    if (attack < 1 || attack > 100) {
        console.log("Chỉ số tấn công không hợp lệ!");
        return;
    }

    let defense = +prompt("Nhập defense (>=0):");
    if (isNaN(defense) || defense < 0) {
        console.log("Defense không hợp lệ!");
        return;
    }

    guild.push({ id, name, class: warriorClass, attack, defense });
    console.log(`Đã thêm chiến binh: ${name} vào guild!`);
};


const deleteWarrior = () => {
    let name = prompt("Nhập tên cần xóa:");
    let index = guild.findIndex(w => w.name.toLowerCase() === name.toLowerCase());

    if (index === -1) {
        console.log(`Chiến binh ${name} không có trong guild.`);
        return;
    }

    let confirmDelete = prompt("Bạn có muốn xóa không (yes/no)?");
    if (confirmDelete === "yes") {
        guild.splice(index, 1);
        console.log(`Đã xóa chiến binh ${name} thành công!`);
    } else {
        console.log("Đã hủy thao tác xóa.");
    }
};


const updateWarrior = () => {
    let name = prompt("Nhập tên cần cập nhật:");
    let index = guild.findIndex(w => w.name.toLowerCase() === name.toLowerCase());

    if (index === -1) {
        console.log(`Chiến binh ${name} không có trong guild!`);
        return;
    }

    let newAttack = +prompt("Nhập attack mới (1-100):");
    let newDefense = +prompt("Nhập defense mới (>=0):");

    if (newAttack < 1 || newAttack > 100) {
        console.log("Attack không hợp lệ!");
        return;
    }

    if (newDefense < 0) {
        console.log("Defense không hợp lệ!");
        return;
    }

    guild[index].attack = newAttack;
    guild[index].defense = newDefense;

    console.log(`Đã cập nhật chiến binh: ${name}`);
};



const searchWarrior = () => {
    let option = prompt("Tìm theo (name/class)?");

    if (option === "name") {
        let name = prompt("Nhập tên:");
        let warrior = guild.find(w => w.name.toLowerCase() === name.toLowerCase());

        if (!warrior) {
            console.log(`Không tìm thấy chiến binh nào tên ${name}.`);
        } else {
            console.log(`Chiến binh: ${warrior.name}, Class: ${warrior.class}, Attack: ${warrior.attack}, Defense: ${warrior.defense}`);
        }
    }

    if (option === "class") {
        let warriorClass = prompt("Nhập class:");
        let results = guild.filter(w => w.class === warriorClass);

        if (results.length === 0) {
            console.log(`Không có chiến binh nào thuộc class ${warriorClass}.`);
        } else {
            results.forEach(w => console.log(`${w.name} | ATK: ${w.attack} | DEF: ${w.defense}`));
        }
    }                                         
};



const totalPower = () => {
    let totalAttack = guild.reduce((sum, w) => sum + w.attack, 0);
    let totalDefense = guild.reduce((sum, w) => sum + w.defense, 0);

    console.log(`Tổng sức mạnh guild hiện tại: Tổng attack: ${totalAttack} | Tổng defense: ${totalDefense}`);
};


const sortGuild = (type) => {
    if (type === "asc") {
        guild.sort((a, b) => a.attack - b.attack);
    } else {
        guild.sort((a, b) => b.attack - a.attack);
    }
    showGuild();
};



const classCoverage = () => {
    let report = {};
    validClasses.forEach(c => report[c] = 0);
    guild.forEach(w => report[w.class]++);

    console.log("===== BÁO CÁO CLASS =====");
    for (let c in report) {
        console.log(`${c}: ${report[c]} chiến binh`);
    }

    let total = guild.length;
    for (let c in report) {
        if (report[c] >= total / 2 && total > 0) {
            console.log(`Cảnh báo: Guild thiên về class ${c} quá nhiều!`);
        }
    }

    let classCount = Object.values(report).filter(v => v > 0).length;
    if (classCount < 3) {
        console.log("Guild thiếu đa dạng class!");
    } else if (classCount >= 4) {
        console.log("Guild khá cân bằng về class!");
    }
};


const battle = () => {
    let name1 = prompt("Nhập tên chiến binh 1:");
    let name2 = prompt("Nhập tên chiến binh 2:");

    let w1 = guild.find(w => w.name.toLowerCase() === name1.toLowerCase());
    let w2 = guild.find(w => w.name.toLowerCase() === name2.toLowerCase());

    if (!w1 || !w2) {
        console.log("Một trong hai chiến binh không tồn tại!");
        return;
    }

    let damage1 = Math.floor(w1.attack - (w2.defense / 2));
    let damage2 = Math.floor(w2.attack - (w1.defense / 2));

    let remain1 = w1.defense - damage2;
    let remain2 = w2.defense - damage1;

    console.log(`${w1.name} gây ${damage1} sát thương`);
    console.log(`${w2.name} gây ${damage2} sát thương`);

    if (remain1 > remain2) {
        console.log(`${w1.name} thắng!`);
    } else if (remain2 > remain1) {
        console.log(`${w2.name} thắng!`);
    } else {
        console.log("Trận đấu hòa!");
    }
};


const startApp = () => {
    while (true) {
        let choice = prompt(`
1. Hiển thị guild
2. Thêm chiến binh
3. Xóa chiến binh
4. Cập nhật chiến binh
5. Tìm kiếm
6. Tổng sức mạnh
7. Sắp xếp attack tăng
8. Sắp xếp attack giảm
9. Kiểm tra class
10. Mô phỏng battle
0. Thoát
        `);

        switch (choice) {
            case "1": showGuild(); break;
            case "2": addWarrior(); break;
            case "3": deleteWarrior(); break;
            case "4": updateWarrior(); break;
            case "5": searchWarrior(); break;
            case "6": totalPower(); break;
            case "7": sortGuild("asc"); break;
            case "8": sortGuild("desc"); break;
            case "9": classCoverage(); break;
            case "10": battle(); break;
            case "0": return;
            default: console.log("Lựa chọn không hợp lệ!");
        }
    }
};

startApp();