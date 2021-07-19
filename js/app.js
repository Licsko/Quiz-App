const quiz = [
  {
    kerdes: "Egy csónakban ül két indián. A kis indián fia a nagy indiánnak, de a nagy indián nem apja a kicsinek. Lehetséges ez?",
    a: "igen",
    b: "nem",
    helyes: "a",
  },
  {
    kerdes: "Hány betűből áll a legrövidebb helyes válasz erre a kérdésre?",
    a: "3-ból",
    b: "8-ból",
    c: "1-ből",
    d: "5-ből",
    helyes: "d",
  },
  {
    kerdes: "Banánlevél, lime, ananász, maracuja.<br> - Melyik országra jellemző?",
    a: "Brazília",
    b: "Venezuela",
    c: "Kolumbia",
    helyes: "a",
  },
  {
    kerdes: "Mi volt Tom és Jerry eredeti neve az első részben?",
    a: "Cat és Mouse",
    b: "Jasper és Jinx",
    c: "Tom és Jerry volt mindig is",
    d: "Katt és Matt",
    helyes: "b",
  },
  {
    kerdes: "Hogy hívták 2009-ben az Amerika Egyesült Államok Elnökét?",
    a: "Barack Obama",
    b: "Joe Biden",
    c: "Donald Trump",
    d: "George Bush",
    helyes: "b",
  },
  {
    kerdes: "Milyen nemzetiségű volt Marco Polo?",
    a: "velencei",
    b: "ír",
    c: "angol",
    helyes: "a",
  },
  {
    kerdes: "Melyikben van a több kalória?",
    a: "Csokis Muffin",
    b: "Egy pohár Sangria",
    helyes: "a",
  },
  {
    kerdes: "Milyen az, aki muszka?",
    a: "dölyfös",
    b: "kövér",
    c: "durva ember",
    helyes: "c"
  },
  {
    kerdes: "Mennyi cukrot tartalmaz 2 dl Coca-Cola?",
    a: "32,4g",
    b: "12,4g",
    c: "22,4g",
    helyes: "c"
  },
  {
    kerdes: "Melyik Földünk legnépesebb országa 2020-ban?",
    a: "India",
    b: "USA",
    c: "Kína",
    d: "Oroszország",
    helyes: "c"
  },
  {
    kerdes: "Melyik nyelvet beszélik a legtöbben anyanyelvi szinten?",
    a: "Francia",
    b: "Angol",
    c: "Spanyol",
    d: "Kínai",
    helyes: "d"
  },
  {
    kerdes: "Dubrovnik melyik országban található?",
    a: "Lengyelország",
    b: "Horvátország",
    c: "Szlovénia",
    helyes: "b"
  },
  {
    kerdes: "Hogyan írjuk helyesen?",
    a: "Szén-dioxid",
    b: "Széndioxid",
    helyes: "a"
  },
  {
    kerdes: "Melyik magyar város ókori kori neve Savaria?",
    a: "Debrecen",
    b: "Sopron",
    c: "Szombathely",
    helyes: "b"
  },
  {
    kerdes: "Azt a folyamatot, amelyben két vagy több folyadék külső erőhatás nélkül összekeveredik, azt, ...",
    a: "...Transzfúziónak nevezzük.",
    b: "...Diffúziónak nevezzük.",
    c: "...Olvadásnak nevezzük.",
    helyes: "b"
  }
];

const kerdes = document.querySelector(".quiz-container h2");
const gombok = document.querySelectorAll("button");
const parents = document.querySelector("ul");

let jelenlegiKerdes = 0;

// Gombok tulajdonságai
Element.prototype.elrejtes = function () {
  this.style.display = "none";
};

Element.prototype.megjelenes = function () {
  this.style.display = "block";
};

// a helyes válaszú szöveg stílusa
Element.prototype.setHelyesValasz = function () {
  this.style.color = "#00ff00";
  this.style.fontWeight = "bolder";
};
// a helytelen válasz szöveg stílusa
Element.prototype.setHelytelenValasz = function () {
  this.style.color = "red";
  this.style.fontWeight = "bolder";
  this.style.textDecoration = "line-through";
};

kerdesBetoltese();


// Lehetséges válaszok beimportálása az Adatstruktúrából FOR ciklussal
function kerdesBetoltese() {
  for (let i = 1; i < Object.values(quiz[jelenlegiKerdes]).length - 1; i++) {
    valaszFelsorolas(
      Object.keys(quiz[jelenlegiKerdes])[i],
      Object.values(quiz[jelenlegiKerdes])[i],
      i
    );
  }

  jelenlegiKerdes + 1;
}

function valaszFelsorolas(id, labelText, index) {
  parents.innerHTML += `
            <li id="${index}">
                <input type="radio" id="${id}" name="valasz" value="${id}">
                <label for="${id}">${labelText}</label>
            </li>
            `;
  kerdes.innerHTML = quiz[jelenlegiKerdes].kerdes;
}

let pontszam = 0;

// Válaszok vizsgálata kattintás eseménnyel
gombok[0].addEventListener("click", () => {
  const opciok = document.querySelectorAll("input");
  const valaszok = document.querySelectorAll("li");

  let isTrue;
  let index;

  let helyesValasz;
  
  for (let i = 0; i < opciok.length; i++) {
    if (opciok[i].value == quiz[jelenlegiKerdes].helyes && (i +1) == valaszok[i].id) {
      index = i;
      helyesValasz = document.getElementById(`${valaszok[index].id}`);
      break;
    }
  }

  for (let i = 0; i < opciok.length; i++) {
    if (opciok[i].checked) {
      isTrue = true;
      if (opciok[i].value == quiz[jelenlegiKerdes].helyes) {
        valaszok[i].setHelyesValasz();
        gombok[0].elrejtes();
        gombok[1].megjelenes();
        pontszam++;
      } else {
        helyesValasz.setHelyesValasz();
        valaszok[i].setHelytelenValasz();
        console.log(index);
        gombok[0].elrejtes();
        gombok[1].megjelenes();
        pontszam+0;
      }
    }
    opciok[i].disabled = true;
  }

  !isTrue ? alert("Jelölj, mert addig nem tudsz tovább menni!") : isTrue;
});

const card = document.querySelector(".quiz-container");

gombok[1].addEventListener("click", function () {
  if (jelenlegiKerdes < quiz.length - 1) {
    jelenlegiKerdes++;
    parents.innerHTML = "";
    kerdes.innerHTML = "";
    gombok[1].elrejtes();
    gombok[0].megjelenes();
    kerdesBetoltese();
  } else {
    card.innerHTML = `
    <h2>VÉGE!</h2>
    <span style="margin: 10px;"><b>${quiz.length}</b> kérdésből <b>${pontszam}</b>-ra adtál jó választ!</span>
    <button onclick="reload()">ÚJRAKEZDÉS</button>
    `;
  }
});

function reload() {
  location.reload();
}