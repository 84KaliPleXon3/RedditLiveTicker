var request = require("request");

var subs = ["tickling","WeddingRingsShowing/","nsfw_wtf","nsfwadviceanimals","NSFWFunny","RedBandTrailers","Bisexy","broslikeus","chesthairporn","dickgirls","gaybears","GaybrosGoneWild","gaycumsluts","GayGifs","gaykink","gaymersgonewild","gaynsfw","gayporn","GaySex","gaysexxxvideos","GayWatersports","GoneWildTrans","LGBTGoneWild","lovegaymale","manass","ManSex","menslegs","NSFW_GAY","NSFW_gay_porn","Pegging","PublicBoys","Sissies","Tgifs","Tgirls","traps","gilf","NSFW_GIF","nsfw_gifs","NSFW_GifSound","porn_gifs","XXX_Animated_Gifs/","AmaiLiu","AngelinaCrow","Cuckold","dirtysmall","DoubleP","doublepenetration","doublevaginal","dp_porn","dpgirls","DPSEX","GoneWildColor","groupsex","highresnsfw","jamesdeen","jennahaze","Joymii","kristinarose","mandingo","nsfwhardcore","O_Faces","onherknees","porn","sexywallpapers","shelikesitrough","spitroast","SpitRoasted","Twistys","VictoriaRaeBlack","xart","AvatarPorn","ecchi","furry","futanariÿ","hentai","pantsu","PortalPorn","rule34","rule34_comics","Vore","yiff","yiffcomics","Encouragement:","joi","jerkinginstruction","jerkingencouragement","chickflixxx","dyke","dykesgonewild","lesbians","lesdom","scissoring","abuseporn","cumonclothes","EarthPornPorn","gonewidl","gore","guro","HypnoGoneWild","IncestVideos","OhCumOn","painal","squidsgonewild","whalesgonewild","zombiesgonewild","DirtyGaming","gamersgonewild","girlsdoingnerdythings/","Pee/r/peegonewild","piss","poop","beef_flaps","bigclit","ButterflyWings","celebritypussy","Creampie","creampies","hairypussy","lipsthatgrip","pussy","pussygape","rearpussy","simps","dirtypenpals","erotica","eroticliterature","gonewildstories","hotwife","NSFWIAmA","sexystories","Adult","Amateur_girls","anal_sex","AnimatedGIF","AnythingGoesNSFW","asianbabes","assimg","badassgirls","barebacksex","BBW_NSFW","bjs","BoltedOnTits","Boobies","bustybabes","buttsex","collegensfw","collegesluts","corsets","cumfetish","ero","EroticArt","FaceSitting","flexi","FootFetish","fuckbuddies","futanari","gangbang","gape","Gay_Ultimate_NSFW","ginger","girlsflashing","gonewildfemale","HairyPussy","heels","hentaiseiyoku","hugenaturals","janadefi","KinkRoomList","kinky","legs","lusciousladies","nakedteens","NaturalWomen","nipples","nsfw_video","NSFW_Vids","NSFW_Wallpapers","nsfw2","NSFW3","NSFWH","pantyhose","porn4free","Pornocamel","PornStars","PORNSTREAMING","pornstuff","PornVideos43","pornvids","pregnant","PunkGirls","PunkLovers","ruleass","seemore","selfpix","sexyandshocking","sickandhothardcore","sideboob","snm","teen_tits","teenporno","teenxxx","tentai","the_nude","titfuck","treesgonewild","twinks","Ultimate_NSFW","vintageporn","volleyballgirls"];

function next(i)
{
	var url = "https://www.reddit.com/r/" + subs[i] + ".json";
	request(url, function(err, res, body)
	{
		if(res.statusCode == 404)
			console.error("subreddit 404: %s", subs[i]);
		else
			console.log("subreddit OK : %s", subs[i]);
		setTimeout(next.bind(null, i + 1), 3000);
	});
}
next(0);