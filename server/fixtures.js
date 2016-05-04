if (Posts.find().count() === 0) {
	var now = new Date().getTime();

	var gogolId = Meteor.users.insert({
		profile: { name: 'Николай Гоголь' }
	});
	var gogol = Meteor.users.findOne(gogolId);

	var burmistrovId = Meteor.users.insert({
		profile: { name: 'Артем Бурмистров' }
	});
	var burmistrov = Meteor.users.findOne(burmistrovId); 

	var tcheblogId = Posts.insert({
	    title: 'Не может быть, чтобы нос пропал сдуру',
	    userId: gogol._id,
	    author: gogol.profile.name,
	    text: 'Как на беду, ни один извозчик не показывался на улице, и он должен был идти пешком, \
	          закутавшись в свой плащ и закрывши платком лицо, показывая вид, как будто у него шла кровь. \
	          «Но авось-либо мне так представилось: не может быть, чтобы нос пропал сдуру», — подумал он \
	          и зашел в кондитерскую нарочно с тем, чтобы посмотреться в зеркало. К счастью, в кондитерской \
	          никого не было; мальчишки мели комнаты и расставляли стулья; некоторые с сонными глазами выносили на подносах \
	          горячие пирожки; на столах и стульях валялись залитые кофием вчерашние газеты. «Ну, слава богу, никого нет, — произнес он, \
	          — теперь можно поглядеть». Он робко подошел к зеркалу и взглянул. «Черт знает что, какая дрянь! — произнес он, плюнувши. \
	          — Хотя бы уже что-нибудь было вместо носа, а то ничего!..»',      
			  submitted: now - 7 * 3600 * 1000,
			'rating': {
		    	'summvalue': 0,
		  		'voted': [],
		  		'rValue': 0
		  		},
		commentsCount: 2
	});

	Comments.insert({
		postId: tcheblogId,
		userId: burmistrov._id,
		author: burmistrov.profile.name,
		submitted: now - 5 * 3600 * 1000,
		body: "Отличный стиль!"
	});

	Comments.insert({
		postId: tcheblogId,
		userId: gogol._id,
		author: gogol.profile.name,
		submitted: now - 3 * 3600 * 1000,
		body: 'Спасибо!'
	});

	Posts.insert({
		title: 'Леший',
		userId: burmistrov._id,
		author: burmistrov.profile.name,
	    text: 'И горе и смех были с этим Лешим! Не было дня, чтобы он в чем-нибудь не попался: то сопрет с воза, \
		            только что прибывшего из города, кусок сала, то в кладовкеиз-под рук стянет горсть сахарного песку, \
		            то у товарища из кармана вытрусит махорку, то по дороге из пекарни в кухню слопает половину хлеба, \
		            то у воспитателя в квартире во время делового разговора возьмет столовый нож. Леший никогда не пользовался \
		            сколько-нибудь сложным планом или самым пустяковым инструментом: так уж он был устроен, \
		            что лучшим инструментом считал свои руки. ',      
	    submitted: now,    
	    'rating': {
		    	 		'summvalue': 0,
		  				'voted': [],
		  				'rValue': 0
		  				 },
		  	commentsCount: 0
		});

		Posts.insert({
		    title: 'Зима',
		    userId: burmistrov._id,
		    author: burmistrov.profile.name,
		    text: 'За окном не было ни дороги, ни кладбища, ни огорода. На дворе бушевала вьюга, воздух дымился снегом. \
		      Можно было подумать, будто буря заметила Юру и, сознавая, как она страшна, наслаждается производимым на него впечатлением. \
		      Она свистела и завывала и всеми способами старалась привлечь Юрино внимание. С неба оборот за оборотом бесконечными мотками\
		      падала на землю белая ткань, обвивая ее погребальными пеленами. Вьюга была одна на свете, ничто с ней не соперничало.',      
		    submitted: now,    
		    'rating': {
		    	 		'summvalue': 0,
		  				'voted': [],
		  				'rValue': 0
		  				 },
		  	commentsCount: 0
		});

		Posts.insert({
		    title: 'Снова зима',
		    userId: burmistrov._id,
		    author: burmistrov.profile.name,
		    text: 'Волки стояли рядом, мордами по направлению к дому и, подняв головы, выли на луну или на отсвечивающие серебряным отливом \
		      окна Микулицынского дома. Несколько мгновений они стояли неподвижно, но едва Юрий Андреевич понял, что это волки, они по-собачьи, \
		      опустив зады, затрусили прочь с поляны, точно мысль доктора дошла до них. Доктор не успел доискаться, в каком направлении они скрылись.',        
		    submitted: now,
		    'rating': {
		    	 		'summvalue': 0,
		  				'voted': [],
		  				'rValue': 0
		  				 },
		  	commentsCount: 0
		});
	}