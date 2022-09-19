import jsonData from "./jsonData.mjs";

const formated = [];

function getSons(desc_pai) {
  const sons = [];
  jsonData
    .filter((i) => i.DESC_PAI === desc_pai)
    .forEach((item) => {
      if (!sons.find((i) => i === item.DESC_FILHO)) {
        sons.push(item.DESC_FILHO);
      }
    });
  return sons;
}

jsonData.forEach((item) => {
  if (!formated.find((i) => i.text === item.DESC_PAI)) {
    formated.push({
      text: item.DESC_PAI,
      children: getSons(item.DESC_PAI).map((i) => {
        return {
          text: i,
          children: jsonData
            .filter((j) => j.DESC_PAI === item.DESC_PAI && j.DESC_NETO && j.DESC_FILHO === i)
            .map((j) => {
              return {
                text: j.DESC_NETO,
              };
            }),
        };
      }),
    });
  }
});

console.log(formated);

function generateChildren(children) {
  const childrens = children.map((item) => {
    return `
            <li>
                <p>${item.children?.length ? item.text + "<span>&rsaquo;</span>" : item.text}</p>
                ${item.children?.length ? generateChildren(item.children) : ""}
            </li>
        `;
  });

  const line = `
        <ul>
            ${childrens.join("")}
        </ul>
    `;

  return line;
}

function generateNav() {
  const nav = document.querySelector("#nav");

  nav.innerHTML = `
        <p>Categorias <span>&rsaquo;</span></p>
        ${generateChildren(formated)}
    `;
}

generateNav();
