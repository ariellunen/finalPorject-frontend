let pointM1 = 0;
let pointM2 = 0;
let tempL = 0;
let tempR = 0;
let change1 = 0;
let change2 = 0;
let indexR = 0;
let indexL = 0;
// var cchange1 = sessionStorage.getItem("cchange1");\
let cchange1 = 0;
let cchange2 = 0;
let m1 = [], m2 = [];
// sessionStorage.setItem("pointtM1", cchange1);

const frequencyL = (leftCoordinates) => {
    // setTimeout(function () {
    if (leftCoordinates[indexL + 1]?.x) {
        // console.log(leftCoordinates);
        for (indexL; indexL < leftCoordinates.length - 1; indexL++) {
            // console.log("2");
            // if (leftCoordinates[indexL]?.x !== (-1) && leftCoordinates[indexL + 1]?.x !== (-1)) {
            if ((Math.abs(leftCoordinates[indexL]?.x - leftCoordinates[indexL + 1]?.x)) < 15) {
                // console.log("3");
                // console.log(leftCoordinates[indexL]?.y);
                // console.log(leftCoordinates[indexL + 1]?.y);
                if (leftCoordinates[indexL]?.y > leftCoordinates[indexL + 1]?.y) {
                    // console.log("A1 - 0");
                    m1.push(0);
                }
                else if (leftCoordinates[indexL]?.y < leftCoordinates[indexL + 1]?.y) {
                    // console.log("A2 - 1");
                    m1.push(1);
                }
                else { //((Math.abs(leftCoordinates[indexL]?.y - leftCoordinates[indexL + 1]?.y)) < 15 )
                    // console.log("A3 - ?");
                    // console.log("??? = ", m1.length - 1, m1[m1.length - 1]);
                    tempL = m1[m1.length - 1];
                    m1.push(tempL);
                }
            }
            else if (leftCoordinates[indexL]?.x < leftCoordinates[indexL + 1]?.x) {
                // console.log(leftCoordinates[indexL]?.x);
                // console.log(leftCoordinates[indexL + 1]?.x);
                // if (leftCoordinates[indexL]?.y > leftCoordinates[indexL + 1]?.y) {
                //     console.log("B2 - 0");
                //     console.log(leftCoordinates[indexL]?.y);
                //     console.log(leftCoordinates[indexL + 1]?.y);
                //     m1.push(0);
                // }
                // else if ((Math.abs(leftCoordinates[indexL]?.y - leftCoordinates[indexL + 1]?.y)) === 0) {
                //     m1.push(0);
                // }
                // else if (leftCoordinates[indexL]?.y < leftCoordinates[indexL + 1]?.y) {
                //     console.log("B3 - 1");
                //     console.log(leftCoordinates[indexL]?.y);
                //     console.log(leftCoordinates[indexL + 1]?.y);
                //     m1.push(1);
                // }
                // //((Math.abs(leftCoordinates[indexL]?.y - leftCoordinates[indexL + 1]?.y)) < 15)
                // else {
                //     console.log("B1 - ?");
                //     console.log("??? = ", m1.length - 1, m1[m1.length - 1]);
                //     tempL = m1[m1.length - 1];
                //     m1.push(tempL);
                // }

                m1.push(0);
            }
            else { // (leftCoordinates[indexL]?.x > leftCoordinates[indexL + 1]?.x)
                // console.log(leftCoordinates[indexL]?.x);
                // console.log(leftCoordinates[indexL + 1]?.x);
                // if (leftCoordinates[indexL]?.y > leftCoordinates[indexL + 1]?.y) {
                //     console.log("C2 - 0");
                //     console.log(leftCoordinates[indexL]?.y);
                //     console.log(leftCoordinates[indexL + 1]?.y);
                //     m1.push(0);
                // }
                // else if ((Math.abs(leftCoordinates[indexL]?.y - leftCoordinates[indexL + 1]?.y)) === 0) {
                //     m1.push(1);
                // }
                // else if (leftCoordinates[indexL]?.y < leftCoordinates[indexL + 1]?.y) {
                //     console.log("C3 - 1");
                //     console.log(leftCoordinates[indexL]?.y);
                //     console.log(leftCoordinates[indexL + 1]?.y);
                //     m1.push(1);
                // }
                // //((Math.abs(leftCoordinates[indexL]?.y - leftCoordinates[indexL + 1]?.y)) < 15)
                // else {
                //     console.log("C1 - ?");
                //     console.log("??? = ", m1.length - 1, m1[m1.length - 1]);
                //     tempL = m1[m1.length - 1];
                //     m1.push(tempL);
                // }
                m1.push(1);
            }
            // console.log("m1 = ", m1);
            if (m1.length >= 2) {
                for (pointM1; pointM1 < m1.length - 1; pointM1++) {
                    //View changes on the left screen
                    if (m1[pointM1] !== m1[pointM1 + 1]) {
                        console.log("sdxvc");
                        change1++;
                    }
                    // document.getElementById("SeveralChanges1").innerHTML = change1 / 10;
                    cchange1 = change1 / 10;
                }
            }
        }
    }
    document.getElementById("SeveralChanges1").innerHTML = cchange1;
}

const frequencyR = (rightCoordinates) => {
    if (rightCoordinates[indexR + 1]?.x) {
        for (indexR; indexR < rightCoordinates.length - 1; indexR++) {
            if ((Math.abs(rightCoordinates[indexR]?.x - rightCoordinates[indexR + 1]?.x)) < 15) {
                if (rightCoordinates[indexR]?.y > rightCoordinates[indexR + 1]?.y) {
                    // console.log("A1 - 0");
                    m2.push(0);
                }
                else if (rightCoordinates[indexR]?.y < rightCoordinates[indexR + 1]?.y) {
                    // console.log("A2 - 1");
                    m2.push(1);
                }
                else { //((Math.abs(rightCoordinates[indexR]?.y - rightCoordinates[indexR + 1]?.y)) < 15)
                    // console.log("A3 - ?");
                    // console.log("??? = ", m2.length - 1, m2[m2.length - 1]);
                    tempR = m2[m2.length - 1];
                    m2.push(tempR);
                }
            }
            else if (rightCoordinates[indexR]?.x < rightCoordinates[indexR + 1]?.x) {
                //     if (rightCoordinates[indexR]?.y > rightCoordinates[indexR + 1]?.y) {
                //         // console.log("B2 - 0");
                //         m2.push(0);
                //     }
                //     else if ((Math.abs(rightCoordinates[indexR]?.y - rightCoordinates[indexR + 1]?.y)) === 0) {
                //         m2.push(0);
                //     }
                //     else if (rightCoordinates[indexR]?.y < rightCoordinates[indexR + 1]?.y) {
                //         // console.log("B3 - 1");
                //         m2.push(1);
                //     }
                //     //((Math.abs(rightCoordinates[indexR]?.y - rightCoordinates[indexR + 1]?.y)) < 15)
                //     else {
                //         // console.log("B1 - ?");
                //         // console.log("??? = ", m2.length - 1, m2[m2.length - 1]);
                //         tempR = m2[m2.length - 1];
                //         m2.push(tempR);
                //     }
                m2.push(0);
            }
            // (rightCoordinates[indexR]?.x > rightCoordinates[indexR + 1]?.x)
            else {
                // if (rightCoordinates[indexR]?.y > rightCoordinates[indexR + 1]?.y) {
                //     // console.log("C2 - 0");
                //     m2.push(0);
                // }
                // else if ((Math.abs(rightCoordinates[indexR]?.y - rightCoordinates[indexR + 1]?.y)) === 0) {
                //     m2.push(1);
                // }
                // else if (rightCoordinates[indexR]?.y < rightCoordinates[indexR + 1]?.y) {
                //     // console.log("C3 - 1");
                //     m2.push(1);
                // }
                // //((Math.abs(rightCoordinates[indexR]?.y - rightCoordinates[indexR + 1]?.y)) < 15)
                // else {
                //     // console.log("C1 - ?");
                //     // console.log("??? = ", m2.length - 1, m2[m2.length - 1]);
                //     tempR = m2[m2.length - 1];
                //     m2.push(tempR);
                // }
                m2.push(1);
            }
            console.log("m2 = ", m2);
            if (m2.length >= 2) {
                for (pointM2; pointM2 < m2.length - 1; pointM2++) {
                    //View changes on the left screen
                    if (m2[pointM2] !== m2[pointM2 + 1]) {
                        change2++;
                    }
                    cchange2 = change2 / 10;
                }
            }

        }
    }
    document.getElementById("SeveralChanges2").innerHTML = cchange2;
}

export default { frequencyL, frequencyR };