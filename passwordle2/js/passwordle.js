const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const [CORRECT, PRESENT, ABSENT, EMPTY] = [0, 1, 2, 3];
const MAX_ATTEMPT = 20;

function rand_from_seed(x, iterations){
  iterations = iterations || 100;
  for(var i = 0; i < iterations; i++)
    x = (x ^ (x << 1) ^ (x >> 1)) % 10000;
  return x;
}

var random = rand_from_seed(~~((new Date)/86400000)); 

let done = false;
let shareText = '';



function decodeResult(x) {
    return ['correct', 'present', 'absent', 'empty'][x];
}

function decodeResultEmoji(x) {
    return ['%F0%9F%9F%A9', '%F0%9F%9F%A8', '%E2%AC%9C%EF%B8%8F'][x];
}

function colorize(actual, result) {
    return actual.split('')
        .map((c, i) => `<div class="tile tile-${decodeResult(result[i])}">${c}</div>`)
        .join('');
}

function colorizeEmoji(result) {
    // ツイートできないので [x]4 [_]19 [ ]41 みたいな形式にしちゃいましょう。
    // でもそれもう別のゲームのリザルトじゃん。そもそも別のゲームだししかたない。
    return [CORRECT, PRESENT, ABSENT].map(c => {
        let count = result.filter(e => e === c).length;
        return `${decodeResultEmoji(c)}${count}`;
    }).join(' ');
}

function toUtf8(str) {
    if (str === '') return new ArrayBuffer(0);

    let u8Array = encodeURIComponent(str).match(/%..|./g).map(c => {
        if (c.length === 1) {
            return c.codePointAt(0);
        } else {
            return parseInt(c.substr(1), 16);
        }
    });
    let n = u8Array.length;
    let array = new ArrayBuffer(n);
    let view = new Uint8Array(array);
    for (let i = 0; i < n; ++i) view[i] = u8Array[i];
    return array;
}

function randomInt(n) {
    return Math.floor(Math.random() * n);
}

function randomPassword() {
    let passwords = ["password",
"baseball",
"football",
"superman",
"1qaz2wsx",
"trustno1",
"jennifer",
"sunshine",
"iloveyou",
"starwars",
"computer",
"michelle",
"princess",
"corvette",
"1234qwer",
"internet",
"samantha",
"whatever",
"maverick",
"steelers",
"mercedes",
"qwer1234",
"hardcore",
"q1w2e3r4",
"midnight",
"bigdaddy",
"victoria",
"1q2w3e4r",
"cocacola",
"marlboro",
"asdfasdf",
"jordan23",
"Password",
"jonathan",
"liverpoo",
"danielle",
"abcd1234",
"scorpion",
"slipknot",
"startrek",
"redskins",
"butthead",
"qwertyui",
"dolphins",
"nicholas",
"elephant",
"mountain",
"xxxxxxxx",
"metallic",
"shithead",
"benjamin",
"creative",
"rush2112",
"asdfghjk",
"passw0rd",
"bullshit",
"1qazxsw2",
"garfield",
"december",
"godzilla",
"airborne",
"lifehack",
"brooklyn",
"platinum",
"darkness",
"blink182",
"12qwaszx",
"snowball",
"pakistan",
"redwings",
"williams",
"nintendo",
"guinness",
"november",
"asdf1234",
"lasvegas",
"babygirl",
"dickhead",
"explorer",
"snickers",
"alexande",
"paradise",
"michigan",
"carolina",
"lacrosse",
"christin",
"kimberly",
"kristina",
"poohbear",
"bollocks",
"drowssap",
"caroline",
"einstein",
"spitfire",
"maryjane",
"1232323q",
"champion",
"svetlana",
"westside",
"courtney",
"patricia",
"aaaaaaaa",
"anderson",
"security",
"stargate",
"simpsons",
"scarface",
"cherokee",
"veronica",
"semperfi",
"scotland",
"marshall",
"qwerty12",
"softball",
"passport",
"franklin",
"zaq12wsx",
"infinity",
"kawasaki",
"vladimir",
"freeuser",
"wildcats",
"budlight",
"brittany",
"bulldogs",
"swordfis",
"PASSWORD",
"patriots",
"pearljam",
"colorado",
"ncc1701d",
"motorola",
"logitech",
"juventus",
"wolverin",
"warcraft",
"hello123",
"peekaboo",
"panthers",
"elizabet",
"spiderma",
"virginia",
"valentin",
"predator",
"mitchell",
"rolltide",
"changeme",
"lovelove",
"loverboy",
"chevelle",
"cardinal",
"michael1",
"american",
"alexandr",
"electric",
"wolfpack",
"darkside",
"freepass",
"airplane",
"cheyenne",
"billybob",
"lawrence",
"pussycat",
"chocolat",
"business",
"cjkysirj",
"stingray",
"serenity",
"greenday",
"charlie1",
"firebird",
"blizzard",
"a1b2c3d4",
"sterling",
"hercules",
"tarheels",
"remember",
"zeppelin",
"swimming",
"pavilion",
"engineer",
"bobafett",
"darkstar",
"icecream",
"hellfire",
"fireball",
"rockstar",
"defender",
"airforce",
"abcdefgh",
"srinivas",
"bluebird",
"presario",
"wrangler",
"precious",
"harrison",
"goldfish",
"dbrnjhbz",
"thailand",
"longhorn",
"wordpass",
"letmein1",
"assassin",
"testtest",
"devildog",
"lonewolf",
"babydoll",
"atlantis",
"montreal",
"angelina",
"shamrock",
"hotstuff",
"mistress",
"deftones",
"cadillac",
"blahblah",
"birthday",
"1234abcd",
"cavalier",
"veronika",
"mustang1",
"goldberg",
"wolfgang",
"savannah",
"leonardo",
"basketba",
"cristina",
"aardvark",
"sweetpea",
"freedom1",
"fredfred",
"kathleen",
"hamilton",
"fuckyou2",
"renegade",
"drpepper",
"bigboobs",
"christia",
"buckeyes",
"stephani",
"enterpri",
"diamonds",
"wetpussy",
"morpheus",
"pornstar",
"thuglife",
"napoleon",
"highland",
"chandler",
"consumer",
"welcome1",
"wrinkle1",
"butterfl",
"sherlock",
"marathon",
"access14",
"overlord",
"trombone",
"isabelle",
"babylon5",
"ultimate",
"yankees1",
"superfly",
"campbell",
"geronimo",
"concrete",
"jessica1",
"portugal",
"sundance",
"pleasure",
"seminole",
"isabella",
"kingkong",
"adgjmptw",
"ncc1701e",
"mongoose",
"alejandr",
"margaret",
"bluemoon",
"ghbdtnbr",
"bonehead",
"stallion",
"personal",
"morrison",
"super123",
"anything",
"rhbcnbyf",
"dietcoke",
"cooldude",
"christop",
"lollipop",
"fernando",
"letmein2",
"werewolf",
"punkrock",
"giovanni",
"cdtnkfyf",
"tottenha",
"hongkong",
"blackcat",
"a1234567",
"zzzzzzzz",
"hollywoo",
"florence",
"gn56gn56",
"clifford",
"stocking",
"matthew1",
"immortal",
"makaveli",
"sebastia",
"ilovesex",
"charlott",
"anthony1",
"satan666",
"columbia",
"infantry",
"eternity",
"waterloo",
"vanhalen",
"skywalke",
"seinfeld",
"standard",
"squirrel",
"qazwsxed",
"fuckfuck",
"robinson",
"musicman",
"megadeth",
"verbatim",
"twilight",
"fuckyou1",
"stardust",
"showtime",
"skittles",
"shaney14",
"intrepid",
"sandiego",
"punisher",
"1234567a",
"dingdong",
"mushroom",
"blackdog",
"slapshot",
"chargers",
"warriors",
"raistlin",
"gangster",
"coltrane",
"tacobell",
"portland",
"penelope",
"1a2b3c4d",
"stranger",
"halflife",
"qwerasdf",
"playtime",
"kangaroo",
"blackman",
"spanking",
"meridian",
"lonestar",
"kittycat",
"goodluck",
"barcelon",
"scoobydo",
"crusader",
"hannibal",
"guardian",
"fuckface",
"discover",
"catalina",
"californ",
"angelica",
"william1",
"stonecol",
"johnjohn",
"septembe",
"scarlett",
"santiago",
"lowrider",
"vacation",
"sithlord",
"ragnarok",
"keyboard",
"penguins",
"lorraine",
"dkflbvbh",
"titleist",
"rootbeer",
"magnolia",
"dodgeram",
"creampie",
"aspirine",
"socrates",
"1234567q",
"redalert",
"qqqqqqqq",
"munchkin",
"mersedes",
"imperial",
"blueeyes",
"bigballs",
"zaq1xsw2",
"research",
"national",
"colombia",
"katerina",
"freckles",
"caliente",
"director",
"oblivion",
"mustangs",
"deadhead",
"zxcv1234",
"porkchop",
"grateful",
"formula1",
"a1s2d3f4",
"shopping",
"peterpan",
"martinez",
"justdoit",
"goodtime",
"thankyou",
"springer",
"Software",
"sapphire",
"richmond",
"kingston",
"brucelee",
"thunder1",
"qawsedrf",
"plymouth",
"mariners",
"heather1",
"chelsea1",
"spectrum",
"pineappl",
"labrador",
"commando",
"southern",
"lesbians",
"fletcher",
"thompson",
"Passw0rd",
"candyman",
"aquarius",
"starfish",
"monopoly",
"infiniti",
"gangbang",
"blackjac",
"8J4yE3Uz",
"sailboat",
"richard1",
"godsmack",
"emmanuel",
"cosworth",
"rosemary",
"lightnin",
"chevrole",
"catherin",
"frontier",
"asshole1",
"spartans",
"luckydog",
"swingers",
"snuggles",
"qwert123",
"mandingo",
"ihateyou",
"beefcake",
"beatrice",
"whocares",
"scooter1",
"doberman",
"clitoris",
"dannyboy",
"children",
"viktoria",
"valhalla",
"oklahoma",
"ncc1701a",
"keystone",
"clarence",
"bunghole",
"romashka",
"pa55word",
"golfball",
"doughboy",
"achilles",
"patrick1",
"gateway1",
"deeznuts",
"cowboys1",
"phillies",
"jeremiah",
"dilligaf",
"atlantic",
"vfrcbvrf",
"technics",
"stripper",
"pinkfloy",
"maryland",
"kentucky",
"hastings",
"frederic",
"butthole",
"agent007",
"somethin",
"porsche9",
"hurrican",
"bearbear",
"nathalie",
"microlab",
"function",
"flamingo",
"truelove",
"nebraska",
"meatball",
"brothers",
"syracuse",
"military",
"macdaddy",
"diamond1",
"universe",
"sentinel",
"manchest",
"kamikaze",
"handsome",
"dthjybrf",
"designer",
"blueblue",
"1qaz1qaz",
"pokemon1",
"pantyhos",
"eatpussy",
"ssssssss",
"meatloaf",
"lifetime",
"jamesbon",
"woofwoof",
"Turkey50",
"rfnthbyf",
"Jennifer",
"front242",
"apollo13",
"terminal",
"starbuck",
"lancelot",
"gordon24",
"brandon1",
"bigmoney",
"azsxdcfv",
"rightnow",
"maradona",
"lionking",
"crazybab",
"charlton",
"passwort",
"japanese",
"holyshit",
"bradford",
"wildfire",
"sexygirl",
"poontang",
"microsof",
"chickens",
"arsenal1",
"software",
"happyday",
"aberdeen",
"123456aa",
"treasure",
"theodore",
"raiders1",
"gretchen",
"ericsson",
"albatros",
"1Passwor",
"mikemike",
"michaela",
"jackson1",
"excalibu",
"anhyeuem",
"trinidad",
"pooppoop",
"greenbay",
"greatone",
"fordf150",
"applepie",
"lisalisa",
"hardrock",
"dinosaur",
"rastaman",
"pa55w0rd",
"madeline",
"hellyeah",
"columbus",
"rockhard",
"positive",
"melissa1",
"kcj9wx5n",
"hyperion",
"happy123",
"gotohell",
"february",
"abc12345",
"yosemite",
"roadkill",
"kingfish",
"billyboy",
"tunafish",
"starship",
"saratoga",
"robotech",
"rasputin",
"rangers1",
"p0015123",
"nwo4life",
"megapass",
"kenworth",
"hedgehog",
"davidson",
"anaconda",
"splinter",
"richards",
"phoenix1",
"karolina",
"railroad",
"pingpong",
"magicman",
"killbill",
"wrestlin",
"tommyboy",
"sherwood",
"passpass",
"pass1234",
"majestic",
"fuckthis",
"freeporn",
"crawford",
"bangbang",
"umbrella",
"salvador",
"operator",
"jeanette",
"gggggggg",
"cinnamon",
"chester1",
"broadway",
"underdog",
"sunnyday",
"snoopdog",
"jasmine1",
"Computer",
"chemical",
"chainsaw",
"canadian",
"brighton",
"australi",
"alliance",
"supersta",
"snowboar",
"r2d2c3po",
"mechanic",
"mamapapa",
"golfgolf",
"downtown",
"chicken1",
"bullseye",
"skorpion",
"saturday",
"peterson",
"meredith",
"eastside",
"blackhaw",
"backdoor",
"westwood",
"sneakers",
"Passwor1",
"marino13",
"getmoney",
"flounder",
"boomboom",
"beerbeer",
"apple123",
"sinclair",
"samsung1",
"moneyman",
"mmmmmmmm",
"marianne",
"jjjjjjjj",
"gargoyle",
"federico",
"amsterda",
"1x2zkg8w",
"zerocool",
"vfvfgfgf",
"test1234",
"hahahaha",
"cambiami",
"pppppppp",
"kristine",
"goldstar",
"chrisbln",
"america1",
"whitesox",
"titanium",
"thursday",
"thirteen",
"tazmania",
"starfire",
"qwerqwer",
"qazwsx12",
"panasoni",
"paintbal",
"newcastl",
"hotpussy",
"giuseppe",
"buckshot",
"babyblue",
"attitude",
"Superman",
"sunflowe",
"solution",
"phillips",
"knickers",
"clarinet",
"assholes",
"tomorrow",
"rhfcjnrf",
"johannes",
"intruder",
"gesperrt",
"francois",
"christie",
"callaway",
"12qw34er",
"resident",
"poseidon",
"pianoman",
"chuckles",
"avalanch",
"rockford",
"meowmeow",
"meathead",
"budweise",
"triangle",
"thanatos",
"crjhgbjy",
"barefoot",
"zxcvbnm1",
"traveler",
"together",
"original",
"mohammed",
"medicine",
"mazafaka",
"juliette",
"james007",
"hawkeyes",
"deeznutz",
"cerberus",
"12345qwe",
"zxasqw12",
"terrapin",
"philippe",
"overkill",
"monalisa",
"illusion",
"hoosiers",
"hayabusa",
"francesc",
"confused",
"clevelan",
"tttttttt",
"smeghead",
"megatron",
"cfitymrf",
"casanova",
"bbbbbbbb",
"rhiannon",
"dddddddd",
"brewster",
"bookworm",
"blessing",
"babybaby",
"valencia",
"thegreat",
"packers1",
"newpass6",
"Michelle",
"dutchess",
"charles1",
"alphabet",
"roadrunn",
"rhtdtlrj",
"mortgage",
"goldwing",
"adrienne",
"teddybea",
"sinister",
"shannon1",
"mortimer",
"madison1",
"handyman",
"doghouse",
"balloons",
"wareagle",
"roadking",
"idontkno",
"gameover",
"claymore",
"chicago1",
"blackbir",
"bcfields",
"whiskers",
"valkyrie",
"talisman",
"starcraf",
"sporting",
"spaceman",
"southpar",
"lipstick",
"kittykat",
"inuyasha",
"babyface",
"strength",
"seahawks",
"recovery",
"hardcock",
"florida1",
"flexible",
"checkers",
"charlene",
"beautifu",
"thedoors",
"sullivan",
"stanford",
"mollydog",
"illinois",
"ghblehjr",
"gamecube",
"cannabis",
"cameltoe",
"bitchass",
"alexalex",
"123qq123",
"wishbone",
"matthews",
"mandarin",
"lalalala",
"godfathe",
"gabriela",
"ffffffff",
"bluefish",
"binladen",
"tiberius",
"silverad",
"northern",
"electron",
"dirtbike",
"deadpool",
"carpedie",
"asdfzxcv",
"amateurs",
"absolute",
"50spanks",
"vampires",
"shanghai",
"property",
"netscape",
"kakashka",
"hawaiian",
"fyutkbyf",
"digital1",
"caligula",
"blackout",
"123456qw",
"z1x2c3v4",
"testpass",
"soulmate",
"q2w3e4r5",
"millions",
"lineage2",
"fuckoff1",
"friendly",
"fgtkmcby",
"criminal",
"coldbeer",
"capslock",
"bullfrog",
"bobdylan",
"babylove",
"annabell",
"yeahbaby",
"vasilisa",
"sergeant",
"reynolds",
"newyork1",
"magazine",
"llllllll",
"jayhawks",
"fishing1",
"dragon12",
"abnormal",
"wg8e3wjf",
"shitface",
"salasana",
"rebecca1",
"pussyman",
"pringles",
"preacher",
"heineken",
"gatorade",
"gabriell",
"ferrari1",
"eldorado",
"coolness",
"BASEBALL",
"thunderb",
"telephon",
"specialk",
"shepherd",
"patience",
"paranoid",
"monster1",
"missouri",
"masamune",
"mamamama",
"laurence",
"hopeless",
"farscape",
"estrella",
"eastwood",
"dragonba",
"crystal1",
"corleone",
"carlitos",
"buttercu",
"buddyboy",
"winston1",
"slippery",
"sandwich",
"piramida",
"monkey12",
"millwall",
"magician",
"jackson5",
"insomnia",
"hardware",
"fountain",
"fastball",
"borussia",
"andromed",
"1234asdf",
"windsurf",
"wildcard",
"reddevil",
"pornporn",
"polopolo",
"panther1",
"jiggaman",
"islander",
"inspiron",
"green123",
"cristian",
"1a2s3d4f",
"violetta",
"smashing",
"sexysexy",
"robotics",
"rjhjktdf",
"reckless",
"knockers",
"killkill",
"katherin",
"jellybea",
"hhhhhhhh",
"gandalf1",
"download",
"doomsday",
"devil666",
"darklord",
"classics",
"chrysler",
"browning",
"barbados",
"scrabble",
"rhjrjlbk",
"rainbow6",
"pharmacy",
"mariposa",
"jakejake",
"insanity",
"graphics",
"geoffrey",
"firewall",
"fandango",
"augustus",
"ashleigh",
"sweetnes",
"scorpio1",
"rochelle",
"radiohea",
"pumpkins",
"mobydick",
"longjohn",
"iverson3",
"istanbul",
"highheel",
"gamecock",
"faithful",
"creature",
"creation",
"concorde",
"budapest",
"windmill",
"thisisit",
"spongebo",
"senators",
"sausages",
"nygiants",
"moonbeam",
"marcello",
"maksimka",
"loveless",
"lollypop",
"katarina",
"icehouse",
"hooligan",
"gertrude",
"fullmoon",
"dynamite",
"buttfuck",
"bulldog1",
"brittney",
"aviation",
"webmaste",
"platypus",
"monkeybo",
"Michael1",
"master12",
"heritage",
"festival",
"dolphin1",
"cccccccc",
"woodland",
"whiteout",
"vanguard",
"temppass",
"reddwarf",
"pussy123",
"forsaken",
"Football",
"ferguson",
"earnhard",
"coolcool",
"tiger123",
"summer99",
"starstar",
"snowflak",
"slamdunk",
"playboy1",
"michael2",
"mephisto",
"kkkkkkkk",
"killer12",
"holidays",
"gorgeous",
"dudedude",
"andersen",
"volkswag",
"solitude",
"roadster",
"presiden",
"pool6123",
"playstat",
"pipeline",
"mazdarx7",
"lemonade",
"krasotka",
"koroleva",
"irishman",
"hawaii50",
"gabriel1",
"freefree",
"christma",
"chipmunk",
"brigitte",
"bigblock",
"bergkamp",
"bearcats",
"1z2x3c4v",
"yankees2",
"wireless",
"tiffany1",
"starligh",
"register",
"pallmall",
"nascar24",
"mudvayne",
"monsters",
"mckenzie",
"mazda626",
"kisskiss",
"gonzalez",
"gbhfvblf",
"freebird",
"fantasia",
"comanche",
"choochoo",
"chambers",
"borabora",
"asdfgh01",
"yogibear",
"wanderer",
"undertak",
"tropical",
"threesom",
"slowhand",
"sheridan",
"marianna",
"just4fun",
"FOOTBALL",
"fishhead",
"firefire",
"customer",
"cocksuck",
"cameron1",
"berkeley",
"andyod22",
"zanzibar",
"training",
"lovelife",
"longdong",
"johndeer",
"jefferso",
"james123",
"jackjack",
"fishbone",
"drummer1",
"coventry",
"catwoman",
"survivor",
"sundevil",
"straight",
"revolver",
"qwerty11",
"paradigm",
"nonenone",
"michaels",
"fairlane",
"everlast",
"chestnut",
"broncos1",
"antelope",
"washburn",
"vfitymrf",
"soccer12",
"soccer10",
"smirnoff",
"rrrrrrrr",
"pumpkin1",
"porsche1",
"marjorie",
"honolulu",
"highbury",
"gilligan",
"eeeeeeee",
"death666",
"costello",
"baritone",
"12qw12qw",
"wwwwwwww",
"wildwood",
"wildbill",
"superior",
"stefanie",
"sidekick",
"remingto",
"redbaron",
"question",
"moonligh",
"mischief",
"ministry",
"minemine",
"Kordell1",
"knuckles",
"fuckhead",
"freefall",
"fantomas",
"elcamino",
"coldplay",
"clippers",
"carpente",
"calimero",
"bluesman",
"bluebell",
"Baseball",
"armstron",
"angelika",
"angel123",
"123456ru",
"zildjian",
"WP2003WP",
"trinitro",
"swinging",
"palmtree",
"nostromo",
"johngalt",
"foxylady",
"fishfish",
"fearless",
"enforcer",
"david123",
"cutiepie",
"cheshire",
"cherries",
"capricor",
"blueball",
"blowfish",
"yamahar1",
"whistler",
"universa",
"strawber",
"sprinter",
"spencer1",
"sonyfuck",
"screamer",
"Princess",
"papillon",
"oooooooo",
"Maverick",
"marcius2",
"lalakers",
"lakeside",
"jermaine",
"honeybee",
"cygnusx1",
"cleopatr",
"carnival",
"buddy123",
"arkansas",
"anastasi",
"zachary1",
"wrestler",
"vendetta",
"terminat",
"smackdow",
"sandrine",
"opendoor",
"nautilus",
"mustang6",
"Misfit99",
"marseill",
"magellan",
"Letmein1",
"leedsutd",
"jackass1",
"hounddog",
"hetfield",
"gtnhjdbx",
"fkbyjxrf",
"espresso",
"dontknow",
"dogpound",
"complete",
"argentin",
"1234zxcv",
"whiteboy",
"waterboy",
"vikings1",
"viewsoni",
"penguin1",
"optimist",
"moonshin",
"mcdonald",
"limewire",
"jonathon",
"johncena",
"harddick",
"gladiato",
"fortress",
"clarissa",
"capetown",
"camaross",
"callisto",
"bigpoppa",
"trucking",
"transfer",
"tomahawk",
"suburban",
"stratfor",
"shadow12",
"private1",
"printing",
"pentagon",
"notebook",
"nokian73",
"matthias",
"marijuan",
"mandrake",
"mamacita",
"kayleigh",
"hotgirls",
"hallo123",
"funstuff",
"fredrick",
"firefigh",
"eggplant",
"dfktynby",
"derparol",
"cbr900rr",
"almighty",
"washingt",
"warrior1",
"username",
"Trustno1",
"tinkerbe",
"suckdick",
"southpaw",
"sexylady",
"rocknrol",
"rfhnjirf",
"progress",
"obsidian",
"nirvana1",
"nineinch",
"money123",
"modelsne",
"minimoni",
"marriage",
"marines1",
"heinrich",
"handball",
"facebook",
"dominion",
"cricket1",
"chris123",
"challeng",
"bubba123",
"bluejays",
"antonina",
"whatwhat",
"Welcome1",
"theforce",
"sylveste",
"stephane",
"sheepdog",
"services",
"republic",
"paramedi",
"margarit",
"ilikepie",
"homework",
"hattrick",
"hardball",
"goodgirl",
"flipflop",
"f00tball",
"evolutio",
"dukeduke",
"cucumber",
"chiquita",
"castillo",
"bigdicks",
"toriamos",
"slimshad",
"riccardo",
"rfntymrf",
"prospect",
"peaches1",
"Mercedes",
"maxwell1",
"mash4077",
"lakewood",
"krokodil",
"hairball",
"dolemite",
"cromwell",
"cassandr",
"cabernet",
"bastards",
"azertyui",
"aolsucks",
"Victoria",
"vauxhall",
"vancouve",
"touching",
"supernov",
"speakers",
"spartan1",
"sigmachi",
"rainyday",
"puppydog",
"power123",
"poiuytre",
"phialpha",
"penthous",
"pavement",
"nnnnnnnn",
"mulligan",
"lonesome",
"lighting",
"klondike",
"kazantip",
"homemade",
"herewego",
"gonzales",
"goldfing",
"genesis1",
"fyfnjkbq",
"forgetit",
"flamengo",
"exchange",
"enternow",
"dodgers1",
"delaware",
"darkange",
"commande",
"cashmone",
"bordeaux",
"billabon",
"awesome1",
"asdffdsa",
"archange",
"annmarie",
"ambrosia",
"alleycat",
"12345qaz",
"woodstoc",
"whiplash",
"trouble1",
"testing1",
"summer69",
"stickman",
"stafford",
"speedway",
"somerset",
"smoothie",
"segblue2",
"scheisse",
"Samantha",
"rainbows",
"pornking",
"pimpdadd",
"pasadena",
"p0o9i8u7",
"navyseal",
"Marlboro",
"longhair",
"lokiloki",
"lkjhgfds",
"gsxr1000",
"gannibal",
"daylight",
"cornwall",
"carebear",
"austin31",
"5Wr2i7H8",
"23skidoo",
"123qwert",
"12345abc",
"voyager1",
"vagabond",
"toonarmy",
"thrasher",
"stigmata",
"sexybabe",
"sergbest",
"scrapper",
"sammy123",
"reginald",
"rainbow1",
"pictures",
"peterbil",
"perfect1",
"pantera1",
"p4ssw0rd",
"normandy",
"luckyone",
"kirkland",
"junkmail",
"josephin",
"Jordan23",
"johnson1",
"futurama",
"fireblad",
"fellatio",
"dragonfl",
"dragon69",
"crackers",
"cartoons",
"blue1234",
"yyyyyyyy",
"warhamme",
"velocity",
"tigercat",
"sunlight",
"sonysony",
"sabrina1",
"romantic",
"rockwell",
"q1234567",
"plastics",
"pinnacle",
"pathetic",
"pancakes",
"offshore",
"nounours",
"ncc74656",
"natasha1",
"mynameis",
"motocros",
"letsdoit",
"kristian",
"francisc",
"dreamcas",
"dragster",
"destiny1",
"delpiero",
"daisydog",
"colonial",
"cannibal",
"candyass",
"bynthytn",
"bigbooty",
"amethyst",
"acidburn",
"1qazzaq1",
"vipergts",
"stephen1",
"sparkles",
"snowbird",
"singapor",
"scissors",
"pressure",
"playball",
"pizzaman",
"pinetree",
"pathfind",
"papamama",
"nightmar",
"Mustang1",
"montrose",
"montecar",
"maserati",
"lockdown",
"kingking",
"jeepster",
"ilovegod",
"hellsing",
"frederik",
"feelgood",
"escalade",
"eleonora",
"dominiqu",
"delldell",
"daughter",
"contract",
"conquest",
"building",
"buffalo1",
"blacklab",
"babycake",
"7777777a",
"1passwor",
"volleyba",
"virginie",
"treefrog",
"therock1",
"tennesse",
"success1",
"stockton",
"skinhead",
"qwqwqwqw",
"playmate",
"piercing",
"painting",
"nineball",
"mohammad",
"matchbox",
"lfitymrf",
"laetitia",
"erection",
"entrance",
"elisabet",
"elements",
"eclipse1",
"eatmenow",
"clemente",
"charlie2",
"baracuda",
"alcatraz",
"1qw23er4",
"1q1q1q1q",
"1234rewq",
"weare138",
"vanessa1",
"usmarine",
"sniffing",
"rfhfylfi",
"rachelle",
"patches1",
"muhammad",
"mallrats",
"macintos",
"macaroni",
"lunchbox",
"kcchiefs",
"istheman",
"implants",
"gabriele",
"forever1",
"chouchou",
"charisma",
"captain1",
"bubbles1"];

 let answer = passwords[random%1621-1];
  console.log(random);
  console.log(random%1621-1);
 console.log(answer);

 let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let digits = '0123456789';
    let punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    let s = letters.repeat(7) + digits.repeat(4) + punctuation.repeat(3);
    let length = 14;
    let res = Array.from({length}, (() => s[randomInt(s.length)])).join('');
    return answer;
}

async function hash(str) {
    let strUtf8 = toUtf8(str);
    let hashed = new Uint8Array(await crypto.subtle.digest('SHA-256', strUtf8));
    return [...hashed].map(e => `0${e.toString(16)}`.substr(-2)).join('').toUpperCase();
}

async function judgeEvent(expected, attempt) {
    if (done) return;
    let input = document.getElementById('input').value;
    let err = document.getElementById('err');



    let actual = await input;
    actual = actual.toLowerCase();
    let result = judge(actual, expected);

    let output = document.getElementById(`attempt-${attempt}`);
    output.innerHTML = colorize(actual, result);
    shareText += colorizeEmoji(result) + '%0A';

    let positive = result.every(e => e === CORRECT);
    let negative = attempt + 1 === MAX_ATTEMPT;
    done |= positive || negative;

    if (!done) return;

    let share = document.getElementById('share');
    share.classList.remove('share-closed');
    share.classList.add('share-open');

    shareText = (
        `passWORDLE ${positive? attempt + 1: 'X'}/${MAX_ATTEMPT}%0A${shareText}%0A`
    );
    
    // if (positive) {
    //     shareText = `passWORDLE ${attempt + 1}/${MAX_ATTEMPT}%0A${shareText}%0A`;
    // } else {
    //     shareText = `passWORDLE X/${MAX_ATTEMPT}%0A%0A`;
    // }
    // // query parameter max length とググると 2048 characters と出ました。
    // // 実際には 1 回目で当てないとツイートできる長さに収まらないので消しちゃいます。
    // if (/* shareText.length > 2048 */ attempt > 0 && positive) {
    //     shareText = `passWORDLE ${attempt + 1}/${MAX_ATTEMPT}%0A`;
    // }

    share.innerHTML += `
        <a class="twitter-share-button"
           href="https://twitter.com/intent/tweet?text=${shareText}"
           data-size="large">Tweet</a>`;

    loadTwttr();
}

function judge(actual, expected) {
    let n = expected.length;
    let result = Array.from({length: n}, (() => ABSENT));
    let count = {};
    for (let c of ALPHABET) {
        count[c] = 0;
    }
    for (let c of expected) {
        count[c] += 1;
    }
    for (let i = 0; i < n; ++i) {
        if (actual[i] === expected[i]) {
            result[i] = CORRECT;
            count[actual[i]] -= 1;
        }
    }
    for (let i = 0; i < n; ++i) {
        if (result[i] === CORRECT) continue;
        if (count[actual[i]] > 0) {
            count[actual[i]] -= 1;
            result[i] = PRESENT;
        }
    }
    return result;
}

function loadTwttr() {
      window.twttr = (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0],
              t = window.twttr || {};
          if (d.getElementById(id)) return t;
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);

          t._e = [];
          t.ready = function(f) {
              t._e.push(f);
          };

          return t;
      }(document, "script", "twitter-wjs"));
}