import jsonData from "./jsonData.mjs";

const formated = [];

jsonData.forEach((item) => {
    if (!formated.find((i) => i.text === item.DESC_PAI)) {
        formated.push({
            text: item.DESC_PAI,
            children: jsonData
                .filter((i) => i.DESC_PAI === item.DESC_PAI && !i.DESC_NETO)
                .map((i) => {
                    return {
                        text: i.DESC_FILHO,
                        children: jsonData
                            .filter(
                                (j) =>
                                    j.DESC_PAI === item.DESC_PAI &&
                                    j.DESC_NETO &&
                                    j.DESC_FILHO === i.DESC_FILHO
                            )
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
