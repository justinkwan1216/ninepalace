// mycalculator.js
//import fs from 'fs'
const fs = require('fs')
class MyCalculator {
    constructor(year, month, day, byear, bmonth, bday, jaxi, jahao, lastname, firstname) {
        // load data
        this.year = parseInt(year);
        this.month = parseInt(month);
        this.day = parseInt(day);
        this.byear = parseInt(byear);
        this.bmonth = parseInt(bmonth);
        this.bday = parseInt(bday);
        this.jaxi = parseInt(jaxi);
        this.jahao = parseInt(jahao);
		this.firstname = firstname;
        this.lastname = lastname;
		
		this.characters = [];
		for (var i = 0; i < firstname.length; i++) {
			this.characters.push(firstname.charAt(i));
		}
		
		while (this.characters.length < 4) {
			this.characters.push('');
		}


        this.firstname1 = this.characters[0];
        this.firstname2 = this.characters[1];
        this.firstname3 = this.characters[2];
        this.firstname4 = this.characters[3];
		
		console.log(this.firstname4);

        this.QITITLE = ["元", "享", "功", "飾", "聲", "幻", "書", "工", "財"];
        this.SHAN = ["平雙","陰陽雙","旺相","破相","淡相"];
        this.default = [11,12,21,22,13,23];
        this.values = ["名", "絕", "煞", "衰", "敗", "交", "利", "官", "財"];
        this.fiveelements = ["木","火","土","金","水"];
        this.letters = ["冠帶","臨官","帝旺","衰","病","死","絕","胎","養","長生"];
        // We need to convert the Python `getValueFromJson` method to JS as well. For now, let's use a placeholder function.
        this.getValueFromJson = (value, filename) => {
		// Code to read JSON file and return value goes here.
		let rawdata = fs.readFileSync(filename);
		let jsonData = JSON.parse(rawdata);

		// Check if the value exists in the jsonData, if not return 0.
		if (jsonData.hasOwnProperty(value)) {
			return jsonData[value];
		} else {
			return 0;
		}
		};

        if (this.lastname.length > 1){
            this.lastbihua = parseInt(this.getValueFromJson(this.lastname[0], "bihua.json"));
        } else {
            this.lastbihua = parseInt(this.getValueFromJson(this.lastname, "bihua.json"));
        }

        this.firstbihua1 = parseInt(this.getValueFromJson(this.firstname1, "bihua.json"));
        this.firstbihua2 = parseInt(this.getValueFromJson(this.firstname2, "bihua.json"));
        this.firstbihua3 = parseInt(this.getValueFromJson(this.firstname3, "bihua.json"));
        this.firstbihua4 = parseInt(this.getValueFromJson(this.firstname4, "bihua.json"));
    }

    concat(num1, num2) {
        return num1*10 + num2;
    }

	getPower(num) {
		let i = Math.floor(num / 10);
		let j = num % 10;
		let swap = 1;
		if (i < j) {
			swap = -1;
		}
		let diff = Math.abs(i - j);
		if (diff > 9) {
			diff %= 9;
		}
		let idx = 0;
		if (diff > 4) {
			idx = -(9 - diff) * swap;
		} else {
			idx = diff * swap;
		}
		// If index is negative, adjust it by adding the length of the array
		if (idx < 0) {
			idx = idx + this.values.length;
		}
		return this.values[idx];
	}

    getFiveElement(index) {

        return this.fiveelements[Math.floor(((index - 1) % 10) / 2)];
    }

    div9(number) {
        if (number % 9 > 0) {
            return number % 9;
        } else {
            return 9;
        }
    }

    getElement(num) {
        let i = Math.floor(num / 10);
        let j = num % 10;
        let swapped = false;
        if (i < j) {
            [i, j] = [j, i];
            swapped = true;
        }
        let diff = i - j;
        if (diff === 0) {
            return this.SHAN[0];
        } else if (diff === 1) {
            if ([3, 5, 7, 9].includes(i)) {
                return swapped ? this.SHAN[2] : this.SHAN[4];
            }
            return this.SHAN[1];
        } else if (diff === 2) {
            return swapped ? this.SHAN[2] : this.SHAN[4];
        } else if (diff === 3) {
            if ([5, 7, 9].includes(i)) {
                return this.SHAN[3];
            }
            return swapped ? this.SHAN[2] : this.SHAN[4];
        } else if (diff >= 4 && diff <= 7) {
            if (i === 9 && j === 2) {
                return swapped ? this.SHAN[4] : this.SHAN[2];
            }
            return this.SHAN[3];
        } else if (diff >= 8) {
            return swapped ? this.SHAN[4] : this.SHAN[2];
        }
    }

    getWholeDiff4WithNeg(num) {
        let i = Math.floor(num / 10);
        let j = num % 10;
        let swap = 1;
        if (i < j) {
            swap = -1;
        }
        let diff = Math.abs(i - j);
        if (diff > 9) {
            diff %= 9;
        }
        if (diff > 4) {
            return -(9 - diff) * swap;
        } else {
            return diff * swap;
        }
    }
	
	 printVariables() {
        //console.log("Year: " + this.year);
        //console.log("Month: " + this.month);
        //console.log("Day: " + this.day);
        //console.log("Last name: " + this.lastname);
        //console.log("First name 1: " + this.firstname1);
		//console.log(this.variables);
		return this.variables;
    }
	
	calculateLongLives() {
		console.log(this.longlive1);
		console.log(this.longlive2);
    this.longlivemap1 = this.getTenLongLive(this.longlive1);
    this.longlivemap2 = this.getTenLongLive(this.longlive2);
    this.longlivemap3 = this.getTenLongLive(this.longlive3);
    this.longlivemap4 = this.getTenLongLive(this.longlive4);

    return [this.longlivemap1, this.longlivemap2, this.longlivemap3, this.longlivemap4];
}

calculateElements() {
	console.log(this.yun1);
    this.element1 = this.getFiveElement(this.yun1);
	//console.log(this.yun1);
	//console.log(this.element1);
    this.element2 = this.getFiveElement(this.yun2);
    this.element3 = this.getFiveElement(this.yun3);
    this.element4 = this.getFiveElement(this.yun4);

    this.threeElements = this.element1 + this.element2 + this.element3;
    this.threeElementsCombo = this.getValueFromJson(this.threeElements, "threeelements.json");

    this.marriageAir1 = this.div9(this.yun1);
    this.marriageAir2 = this.div9(this.yun2);
    this.marriageAir3 = this.div9(this.yun3);

    this.firstbornNeg = this.getWholeDiff4WithNeg(this.concat(this.marriageAir2, this.marriageAir1));
    this.firstborn = Math.abs(this.firstbornNeg);

    this.marriageElement2 = this.getFiveElement(this.marriageAir2);
    this.marriageElement3 = this.getFiveElement(this.marriageAir3);

    this.marriageNum = this.concat(this.marriageAir2, this.marriageAir3);

    this.marriageAirCombo = this.getElement(this.marriageNum);
}

calculateAge() {
    this.yearage = this.year - this.byear + 1;

    if ((this.month - this.bmonth) <= -6) {
        this.age = this.yearage - 1;
    } else if ((this.month - this.bmonth) > 6) {
        this.age = this.yearage + 1;
    } else {
        this.age = this.yearage;
    }

    return this.age;
}

calculateYunValues() {
    let [yun1, yun2, yun3, yun4, yun5, yun6] = this.yunValues;

    this.longlive1 = (yun1 - 10 * Math.floor(yun1 / 10)) * 10 + ((this.age + 2) - 10 * Math.floor((this.age + 2) / 10));
    this.longlive2 = (yun2 - 10 * Math.floor(yun2 / 10)) * 10 + ((this.age) - 10 * Math.floor((this.age) / 10));
    this.longlive3 = (yun3 - 10 * Math.floor(yun3 / 10)) * 10 + ((this.age) - 10 * Math.floor((this.age) / 10));
    this.longlive4 = (yun4 - 10 * Math.floor(yun4 / 10)) * 10 + ((this.age) - 10 * Math.floor((this.age) / 10));

    this.longlives = [this.longlive1, this.longlive2, this.longlive3, this.longlive4];
}

getTenLongLive(index) {
	let tenthdigit = Math.floor(index / 10);
    let singledigit = index % 10;
    index = -tenthdigit;
    let getshift = (index + singledigit) % -10;
	getshift = (getshift + 10) % 10;
    //getshift = (getshift < 0) ? this.letters.length + getshift : getshift;
    //console.log(this.letters[getshift]);
    return this.letters[getshift];
}

	calculateValues() {
    let lasttwo = this.firstbihua2 + this.firstbihua3;
    let five_first_two = this.firstbihua2 + this.firstbihua3;
    let firstfour = this.lastbihua + this.firstbihua1 + this.firstbihua2 + this.firstbihua3;
    let all_five = this.lastbihua + this.firstbihua1 + this.firstbihua2 + this.firstbihua3 + this.firstbihua4;

    let tin = this.lastbihua + 1;
    let ren = this.lastbihua + this.firstbihua1;
	// The problem is it concat the string, we should add the value together as INT VALUE
	//console.log(this.lastbihua);
	let zhong = this.lastbihua + this.firstbihua1 + this.firstbihua2;
    let di = this.firstbihua1 + this.firstbihua2;
    let wai = this.firstbihua2 + 1;
    let wai2 = this.firstbihua3 + 1;
	
    let lastnamelen = this.lastname.length;
    let firstnamelen = this.firstname1.length + this.firstname2.length + this.firstname3.length + this.firstname4.length;
    // S46 is length of lastname*10+lengthoffirstname
    let S46 = lastnamelen * 10 + firstnamelen;

    //父
    let O49 = [tin, tin, ren, ren, tin, ren];

    //疾
    let O50 = [ren, ren, zhong, zhong, ren, zhong];

    //奴
    let O51 = [this.firstbihua1 + 1, di, wai, lasttwo, this.firstbihua1 + this.firstbihua2 + this.firstbihua3, this.firstbihua2*2 + this.firstbihua3];

    //命
    let O52 = [ren, zhong, zhong, firstfour, firstfour, this.lastbihua + this.firstbihua1 + this.firstbihua2*2 + this.firstbihua3];

    //遷
    let O53 = [1, wai, 1, wai2, lasttwo, five_first_two];

    //管
    let O54 = [this.firstbihua1, this.firstbihua1, this.firstbihua2, this.firstbihua2, this.firstbihua1, this.firstbihua2];

    let index = this.default.indexOf(S46);

    this.yun1 = O49[index];
    this.yun2 = O50[index];
    this.yun3 = O51[index];
    this.yun4 = O52[index];
    this.yun5 = O53[index];
    this.yun6 = O54[index];
	console.log(O49,O50,O51,O52,O53,O54);
	console.log(this.yun4);
	//console.log(O52);
	console.log(this.yun4);

    this.yunValues = [this.yun1, this.yun2, this.yun3, this.yun4, this.yun5, this.yun6];
    this.age = this.calculateAge();
    this.longLives = this.calculateYunValues();
    this.longLiveMapValues = this.calculateLongLives();
    this.calculateElements();
}
checkDiff4Combo() {
    if ([1, 3, 21, 23, -21, -23].includes(this.diff4_combo)) {
        this.diff_combo_result = "失人和";
    } else if ([32, -32].includes(this.diff4_combo)) {
        this.diff_combo_result = "易不動";
    } else {
        this.diff_combo_result = "";
    }
}

calculateWorkingMagnetic() {
    this.working_magnetic = this.getValueFromJson(String(this.diff4_with_neg), "working_magnetic.json");
    this.diff4_explain = this.getValueFromJson(String(this.diff4_with_neg), "4diff_explain.json");
}
elementCombo(elements) {
    const chemistry = ["旺相","生出","剋出","回頭剋","回頭生"];
    const chemistryExplain = ["同行宅","回流宅","喜用宅","官碌宅","無力宅"];
    const moneyExplain = ["旺財","洩財","破財","旺財","旺財"];
    let diff = this.fiveelements.indexOf(elements[1]) - this.fiveelements.indexOf(elements[0]);
	diff = (diff + chemistry.length) % chemistry.length; // adjust index if it's negative
    
    return [chemistry[diff], chemistryExplain[diff], moneyExplain[diff]];
}

calculateMoneyCom() {
	console.log(this.element2);
	console.log(this.element3);

    if (this.yun2 === this.yun3) {
        return "洩財";
    } else {
        return this.elementCombo([this.element2, this.element3]);
    }
}

getWholeDiff4(num) {
    let i = Math.floor(num / 10);
    let j = num % 10;
    let diff = Math.abs(i - j);

    if (diff > 9) {
        diff %= 9;
    }

    if (diff > 4) {
        return 9 - diff;
    } else {
        return diff;
    }
}
checkSpecialCases() {
    this.special = false;
    this.special2 = false;
    this.doublespecial = false;

    if (this.diff4 === Math.abs(this.diff4_with_neg)) {
        this.special = true;
    }

    if (this.firstborn === this.diff4) {
        this.special2 = true;
    }

    if (this.special && this.special2) {
        this.doublespecial = true;
    }

    if (this.doublespecial) {
        this.specialstate = "雙奇格";
    } else if (this.special) {
        this.specialstate = "特殊機運局";
    } else if (this.special2) {
        this.specialstate = "特殊格局";
    } else {
        this.specialstate = "";
    }
}

calculateLife() {
    this.life = this.div9(this.yun4);
    this.live_star = this.getValueFromJson(String(this.yun4), "live_star.json")[1];
	this.live_star_explain = this.getValueFromJson(String(this.yun4), "live_star.json")[0];
    this.after_star = this.getValueFromJson(String(this.yun3), "after_star.json")[0];
    this.wife_diff4 = this.getWholeDiff4(this.yun3);
    this.yun5_element = this.getFiveElement(this.yun5);
    this.manage = this.div9(this.yun6);
    this.manage_type = this.getValueFromJson(String(this.manage), "manage.json")[0];
	console.log(typeof this.concat(this.life, this.div9(this.day)));
	console.log(this.concat(this.life, this.div9(this.day)));
    this.power = this.getPower(this.concat(this.life, this.div9(this.day)));
    this.power_explain = this.getValueFromJson(this.power, "fleeting_day.json")[0];
    this.longliveluck = this.getValueFromJson(this.longlivemap4, "longliveluck.json")[0];
    this.ge = this.getValueFromJson(this.threeElements, "ge.json")[0];
    this.direction = this.getValueFromJson(String(this.life), "direction.json")[0];
    this.money_star = this.getValueFromJson(String(this.yun2), "after_star.json")[0];
    this.invest = this.getWholeDiff4(this.marriageNum);
    this.invest = this.getValueFromJson(String(this.invest), "ju.json");
    this.thought = this.getValueFromJson(this.element1 + this.element2, "thought.json");
    this.thought1 = this.thought[1].split(" ")[0];
    this.thought2 = this.threeElements[0];
    this.action = this.getValueFromJson(this.element2 + this.element3, "action.json");
    this.action1 = this.action[1].split(" ")[0];
    this.action2 = this.threeElements[1];
    this.yeardiv9 = this.div9(this.year);
	this.agelastdigit = this.yearage % 10;
	this.agestar = this.getValueFromJson(String(this.agelastdigit), "agestar.json")[0];
	this.agestar_explain = this.getValueFromJson(this.agestar, "agestar_explain.json")[0];
    this.age_element = this.getFiveElement(this.agelastdigit);
    this.jaxipower = this.getPower(this.concat(this.jaxi, this.yeardiv9));
    this.jahao_element = this.getFiveElement(this.jahao % 10);
    this.jahaodiv9 = this.div9(this.jahao);
    this.function_ratio = this.getWholeDiff4WithNeg(this.concat(this.life, this.jaxi));
    this.function_ratio_explain = this.getValueFromJson(String(this.function_ratio), "4diff.json");
	//console.log(this.thought);
	//console.log(this.action);
	//console.log(this.live_star_explain);
	//歲值星座
	//console.log(this.agestar_explain);
}
calculateTwelve(){
	let definedyear = this.year - 3;
    let definedyeardiv9 = this.yeardiv9 - 3;
    let definedyearage = this.yearage - 3;

    this.twelveyears = [];
    for (let i = 0; i < 12; i++) {
        this.yearlonglive4 = ((this.yun4 - 10 * Math.floor(this.yun4 / 10)) * 10) + (definedyearage % 10);
        let yearlongmap4 = this.getTenLongLive(this.yearlonglive4);
	
		let lifeAir = this.concat(this.life, definedyeardiv9);
        let parentAir = this.concat(this.marriageAir1, definedyeardiv9);
        let moneyAir = this.concat(this.marriageAir2, definedyeardiv9);
        let childAir = this.concat(this.marriageAir3, definedyeardiv9);

        let allAir = [lifeAir, parentAir, moneyAir, childAir];
        let allAirPower = this.mass_get_power(allAir);

		let gua = this.getValueFromJson(yearlongmap4 + this.getPower(lifeAir), "luck.json")[0];
		//add to current year
		if (i==3){
			this.currentyearlongmap4 = yearlongmap4;
			
			this.lifeAir = lifeAir
			this.parentAir = parentAir
			this.moneyAir = moneyAir
			this.childAir = childAir
			
			this.allAir = allAir;
			this.allAirPower = allAirPower;
			
			this.current_four_luck_mapping = {
			"命": this.allAirPower[0],
			"父母": this.allAirPower[1],
			"財": this.allAirPower[2],
			"子女": this.allAirPower[3]
			};
			
			this.gua = gua;

		}
		
        let temp_all_luck_mapping = {
            "年齡": definedyearage,
            "年份": definedyear,
            "長生運": yearlongmap4,
            "命": allAirPower[0],
            "父母": allAirPower[1],
            "財": allAirPower[2],
            "子女": allAirPower[3],
            "卦象": gua
        };

        definedyear += 1;
        definedyeardiv9 += 1;
        definedyearage += 1;
        
        definedyeardiv9 = this.div9(definedyeardiv9);

        this.twelveyears.push(temp_all_luck_mapping);
    }
	
}
calculateQi() {
    this.qiyunarray = this.qiyun(this.jaxi);
    this.direction_array = this.masscheckdirection(this.qiyunarray);
	
	this.direction_mapping = {
        "元": this.direction_array[0],
        "享": this.direction_array[1],
        "功": this.direction_array[2],
        "飾": this.direction_array[3],
        "聲": this.direction_array[4],
        "幻": this.direction_array[5],
        "書": this.direction_array[6],
        "工": this.direction_array[7],
        "財": this.direction_array[8],
    };
    
}
calculateTrigger() {
    let trigger_dict = {
        "命宮發動": this.generate_trigger(this.yun4, 8),
        "父母宮發動": this.generate_trigger(this.yun1, 11),
        "疾厄宮發動": this.generate_trigger(this.yun2, 9),
        "奴僕宮發動": this.generate_trigger(this.yun3, 9),
        "遷移宮發動": this.generate_trigger(this.yun5, 11)
    };

    this.final_trigger = Object.keys(trigger_dict).find(key => trigger_dict[key].includes(this.age)) || "";

    let chance_concat = this.concat(this.life, this.div9(this.byear + this.yun4));
    this.chance = this.getPower(chance_concat);
}

calculateJu() {
    this.diff4 = this.getWholeDiff4(this.yun4);
    this.ju = this.getValueFromJson(String(this.diff4), "ju.json");
}

calculateDiff4WithNeg() {
    this.diff4_with_neg = this.getWholeDiff4WithNeg(this.marriageNum);
    this.diff4_combo = this.concat(this.diff4_with_neg, this.diff4);
}

runCalculations() {
    this.calculateValues();
    this.money_com = this.calculateMoneyCom();
    this.calculateJu();
    this.calculateDiff4WithNeg();
    this.checkSpecialCases();

    this.calculateWorkingMagnetic();
    this.checkDiff4Combo();
    this.calculateLife();
    this.calculateQi();
	this.calculateTwelve();
	this.calculateTrigger();
	this.final_result();
}
final_result() {
    this.variables = {
        "先天關係": this.diff_combo_result,
        "命宮局(4平)": this.diff4,
        "命局解釋": this.ju,
        "財庫/後天格": this.diff4_with_neg,
        "運作磁波": this.working_magnetic,
        "夫妻宮局(4平)": this.wife_diff4,
        "特殊局": this.specialstate,
        "歲值": this.yearage,
        "實際流年年齡": this.age,
        "六宮運值": this.yunValues,
        "長生1(天格)(姓總筆劃+1)": this.longlivemap1,
        "長生2(人格)(姓加名第1字筆劃)": this.longlivemap2,
        "長生3(地格)(名第1,2字筆劃)": this.longlivemap3,
        "長生4(總格)(姓名總筆劃)": this.longlivemap4,
        "財(旺破洩)": this.money_com,
        "派別": this.diff4_explain,
        "長生1(元素)": this.element1,
        "長生2(元素)": this.element2,
        "長生3(元素)": this.element3,
        "長生4(元素)": this.element4,
        "三元素組合": this.threeElements,
        "三元素化學反應": this.threeElementsCombo,
        "長生1餘9": this.marriageAir1,
        "長生2餘9": this.marriageAir2,
        "長生3餘9": this.marriageAir3,
        "先天格": this.firstborn,
        "人格元素2": this.marriageElement2,
        "地格元素3": this.marriageElement3,
        "婚姻合(人格餘9合地格餘9)": this.marriageNum,
        "正生克(婚姻合五相)": this.marriageAirCombo,
        "命宮(長生4餘9)": this.life,
        "命宮星座": this.live_star,
        "後運星座": this.after_star,
        "外格(遷移宮)(名最後字筆劃+1)": this.yun5,
        "外格元素": this.yun5_element,
        "管理(名第2字筆劃餘9)": this.manage,
        "管理型": this.manage_type,
        "流日": this.power,
        "流日解釋": this.power_explain,
        "長生運": this.longliveluck,
        "成格": this.ge,
        "本命方位": this.direction,
        "人格(財宮)": this.money_star,
        "投資": this.invest,
        "思考1": this.thought1,
        "思考2": this.thought2,
        "行動1": this.action1,
        "行動2": this.action2,
        "年齡(餘9)": this.yeardiv9,
        "歲值尾數元素": this.age_element,
        "官碌宅(餘9)": this.jahaodiv9,
        "宅氣能量": this.jaxipower,
        "宅號元素": this.jahao_element,
        "功能比": this.function_ratio,
        "功能比解釋": this.function_ratio_explain,
        "氣源方位": this.direction_mapping,
        "長生運": this.currentyearlongmap4,
        "流年四長生運": this.current_four_luck_mapping,
        "卦象": this.gua,
        "觸發": this.final_trigger,
        "機會": this.chance,
        "歲值星座": this.agestar,
        "十二年運":this.twelveyears
    }
}
mass_get_power(array) {
    let power_array = [];
    for (let i of array) {
        power_array.push(this.getPower(i));
    }
    return power_array;
}

generate_trigger(num, threshold) {
    let array = [];
    let increment_start = num + 1;
    let decrement_start = num - 10;
    for (let i = 0; i < threshold; i++) {
        array.push(increment_start);
        increment_start += 9;
    }
    for (let i = 0; i < 12 - threshold; i++) {
        if (decrement_start > 0) {
            array.push(decrement_start);
        }
        decrement_start -= 9;
    }
    return array;
}

masscheckdirection(array) {
    let temp_array = [];
    for (let each of array) {
        let temp = this.getValueFromJson(String(each), "direction.json")[0].split("方,")[0].replace("吉位", "");
        temp_array.push(temp);
    }
    return temp_array;
}

qiyun(num) {
    let temp_array = [];
    while (temp_array.length < 9) {
        temp_array.push(num);
        num += 1;
        if (num > 9) {
            num = 1;
        }
    }
    return temp_array;
}
}
//export default MyCalculator;
module.exports = MyCalculator;
//window.MyCalculator = MyCalculator;
//let calc = new MyCalculator(112,2,22,82,9,3,6,3,"歐陽","彬彬彬");
//calc.runCalculations();
//calc.printVariables();