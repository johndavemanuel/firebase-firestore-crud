let employeeRef = db.collection('employees');
let deleteIDs = [];

// REAL TIME LISTENER
employeeRef.onSnapshot(snapshot => {
	let changes = snapshot.docChanges();
	changes.forEach(change => {
		if (change.type == 'added') {
			console.log('added');
		} else if (change.type == 'modified') {
			console.log('modified');
		} else if (change.type == 'removed') {
			$('tr[data-id=' + change.doc.id + ']').remove();
			console.log('removed');
		}
	});
});

// GET TOTAL SIZE
employeeRef.onSnapshot(snapshot => {
	let size = snapshot.size;
	$('.count').text(size);
	if (size == 0) {
		$('#selectAll').attr('disabled', true);
	} else {
		$('#selectAll').attr('disabled', false);
	}
});


const displayEmployees = async (doc) => {
	console.log('displayEmployees');

	let employees = employeeRef;
	// .startAfter(doc || 0).limit(10000)

	const data = await employees.get();

	data.docs.forEach(doc => {
		const employee = doc.data();
		let item =
			`<tr data-id="${doc.id}">
					<td>
							<span class="custom-checkbox">
									<input type="checkbox" id="${doc.id}" name="options[]" value="${doc.id}">
									<label for="${doc.id}"></label>
							</span>
					</td>
					<td class="employee-name">${employee.name}</td>
					<td class="employee-email">${employee.email}</td>
					<td class="employee-address">${employee.address}</td>
					<td class="employee-phone">${employee.phone}</td>
					<td>
							<a href="#" id="${doc.id}" class="edit js-edit-employee"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
							</a>
							<a href="#" id="${doc.id}" class="delete js-delete-employee"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
							</a>
					</td>
			</tr>`;

		$('#employee-table').append(item);

		// ACTIVATE TOOLTIP
		$('[data-toggle="tooltip"]').tooltip();

		// SELECT/DESELECT CHECKBOXES
		var checkbox = $('table tbody input[type="checkbox"]');
		$("#selectAll").click(function () {
			if (this.checked) {
				checkbox.each(function () {
					console.log(this.id);
					deleteIDs.push(this.id);
					this.checked = true;
				});
			} else {
				checkbox.each(function () {
					this.checked = false;
				});
			}
		});
		checkbox.click(function () {
			if (!this.checked) {
				$("#selectAll").prop("checked", false);
			}
		});
	})

	// UPDATE LATEST DOC
	latestDoc = data.docs[data.docs.length - 1];

	// UNATTACH EVENT LISTENERS IF NO MORE DOCS
	if (data.empty) {
		$('.js-loadmore').hide();
	}
}

// ADD TEST DATA
function addTestData() {
	const employeesdata = [{
			"name": "Ellis",
			"email": "estarcks0@stumbleupon.com",
			"address": "56 Susan Alley",
			"phone": "559-851-3488"
		},
		{
			"name": "Lindie",
			"email": "lhalmkin1@bizjournals.com",
			"address": "434 Bartelt Trail",
			"phone": "302-788-8994"
		},
		{
			"name": "Tadio",
			"email": "tpolin2@sphinn.com",
			"address": "51489 Golf Course Alley",
			"phone": "964-933-3647"
		},
		{
			"name": "Gran",
			"email": "gcastilla3@drupal.org",
			"address": "004 Banding Hill",
			"phone": "508-780-5461"
		},
		{
			"name": "Marice",
			"email": "mlabat4@mediafire.com",
			"address": "68 Raven Trail",
			"phone": "720-324-4679"
		},
		{
			"name": "Wayland",
			"email": "wryman5@devhub.com",
			"address": "10674 Grasskamp Point",
			"phone": "270-487-7028"
		},
		{
			"name": "Ruggiero",
			"email": "rgasking6@phoca.cz",
			"address": "86937 Mosinee Plaza",
			"phone": "730-101-4061"
		},
		{
			"name": "Eada",
			"email": "edavidov7@disqus.com",
			"address": "41 Victoria Park",
			"phone": "708-404-7865"
		},
		{
			"name": "Emmott",
			"email": "elorans8@acquirethisname.com",
			"address": "0023 Shopko Center",
			"phone": "997-737-0672"
		},
		{
			"name": "Twila",
			"email": "tpaszak9@cargocollective.com",
			"address": "319 Macpherson Place",
			"phone": "196-871-7636"
		},
		{
			"name": "Wyndham",
			"email": "wkeddiea@posterous.com",
			"address": "0281 Waubesa Crossing",
			"phone": "809-289-2053"
		},
		{
			"name": "Jacobo",
			"email": "jsarllb@hc360.com",
			"address": "1354 Bluestem Place",
			"phone": "506-880-4527"
		},
		{
			"name": "Carlie",
			"email": "chornungc@ehow.com",
			"address": "59648 Thackeray Pass",
			"phone": "513-731-4506"
		},
		{
			"name": "Justinian",
			"email": "jtolomeid@example.com",
			"address": "4881 Graedel Parkway",
			"phone": "988-275-5768"
		},
		{
			"name": "Valentia",
			"email": "vdevitae@behance.net",
			"address": "4 Kim Way",
			"phone": "363-118-8729"
		},
		{
			"name": "Brittni",
			"email": "bstockportf@instagram.com",
			"address": "1 Corscot Drive",
			"phone": "928-179-2977"
		},
		{
			"name": "Nev",
			"email": "nstebbing@sbwire.com",
			"address": "9 Quincy Park",
			"phone": "855-215-0539"
		},
		{
			"name": "Bobbette",
			"email": "bsansamh@hubpages.com",
			"address": "57 Green Ridge Court",
			"phone": "724-936-5063"
		},
		{
			"name": "Wakefield",
			"email": "wcrudgintoni@foxnews.com",
			"address": "42 Basil Point",
			"phone": "703-294-6344"
		},
		{
			"name": "Taber",
			"email": "tsheratonj@ftc.gov",
			"address": "9223 Ridgeway Circle",
			"phone": "464-349-5957"
		},
		{
			"name": "Kermie",
			"email": "kblankenshipk@webmd.com",
			"address": "9 Continental Center",
			"phone": "249-976-5293"
		},
		{
			"name": "Babita",
			"email": "bhendricksonl@lycos.com",
			"address": "2848 Schmedeman Pass",
			"phone": "794-318-0701"
		},
		{
			"name": "Neddy",
			"email": "ndunsm@bing.com",
			"address": "7865 Hayes Court",
			"phone": "753-925-6416"
		},
		{
			"name": "Abey",
			"email": "amcnellisn@homestead.com",
			"address": "95827 Twin Pines Road",
			"phone": "113-220-6998"
		},
		{
			"name": "Amitie",
			"email": "aedgewortho@example.com",
			"address": "15768 Dexter Pass",
			"phone": "669-493-0702"
		},
		{
			"name": "Brigham",
			"email": "bmalamorep@google.it",
			"address": "23 Cottonwood Center",
			"phone": "298-572-5181"
		},
		{
			"name": "Florella",
			"email": "fsheeresq@smh.com.au",
			"address": "2 Stuart Trail",
			"phone": "453-314-0000"
		},
		{
			"name": "Catrina",
			"email": "cshadfourthr@va.gov",
			"address": "05 Hauk Parkway",
			"phone": "763-431-0935"
		},
		{
			"name": "Libby",
			"email": "ltanswills@yandex.ru",
			"address": "1311 Rieder Junction",
			"phone": "869-788-9058"
		},
		{
			"name": "Bebe",
			"email": "bliast@seesaa.net",
			"address": "9 Jenifer Lane",
			"phone": "398-368-2069"
		},
		{
			"name": "Biron",
			"email": "bscroobyu@examiner.com",
			"address": "078 Farwell Court",
			"phone": "655-875-4594"
		},
		{
			"name": "Julia",
			"email": "jswindinv@goodreads.com",
			"address": "2838 Bunker Hill Park",
			"phone": "615-930-7557"
		},
		{
			"name": "Elinor",
			"email": "ewhitebreadw@youtube.com",
			"address": "9105 Summit Road",
			"phone": "925-966-4110"
		},
		{
			"name": "Trip",
			"email": "tfinex@jugem.jp",
			"address": "0 Dexter Parkway",
			"phone": "132-322-5784"
		},
		{
			"name": "Preston",
			"email": "ptremelliery@joomla.org",
			"address": "576 2nd Park",
			"phone": "473-108-8640"
		},
		{
			"name": "Amalee",
			"email": "aakittz@about.me",
			"address": "73702 Arapahoe Point",
			"phone": "742-242-1622"
		},
		{
			"name": "Arni",
			"email": "akubala10@sciencedaily.com",
			"address": "520 Continental Place",
			"phone": "124-615-5776"
		},
		{
			"name": "Kelly",
			"email": "kcasini11@auda.org.au",
			"address": "17 Ronald Regan Alley",
			"phone": "445-963-1850"
		},
		{
			"name": "Lenard",
			"email": "lhacquard12@jiathis.com",
			"address": "82 Ramsey Street",
			"phone": "145-946-2759"
		},
		{
			"name": "Devon",
			"email": "dflawith13@nationalgeographic.com",
			"address": "91782 Vahlen Crossing",
			"phone": "920-408-5424"
		},
		{
			"name": "Hinda",
			"email": "hveck14@dropbox.com",
			"address": "7127 Farwell Place",
			"phone": "941-925-8241"
		},
		{
			"name": "Cherry",
			"email": "ckeyworth15@gravatar.com",
			"address": "7143 Center Circle",
			"phone": "298-502-9973"
		},
		{
			"name": "Ginevra",
			"email": "gguillem16@imgur.com",
			"address": "21 Basil Parkway",
			"phone": "686-786-5519"
		},
		{
			"name": "Holly-anne",
			"email": "hschimonek17@ning.com",
			"address": "77688 Meadow Vale Terrace",
			"phone": "341-563-6676"
		},
		{
			"name": "Shawna",
			"email": "sfossick18@google.de",
			"address": "7 Elka Circle",
			"phone": "193-618-9013"
		},
		{
			"name": "Kayle",
			"email": "kroberson19@drupal.org",
			"address": "446 Rusk Parkway",
			"phone": "335-233-3649"
		},
		{
			"name": "Patty",
			"email": "psandon1a@chron.com",
			"address": "246 Delaware Park",
			"phone": "204-672-4965"
		},
		{
			"name": "Sara-ann",
			"email": "salbiston1b@wikipedia.org",
			"address": "543 Emmet Avenue",
			"phone": "222-513-6097"
		},
		{
			"name": "Tandie",
			"email": "tlusher1c@vkontakte.ru",
			"address": "24895 Hoepker Avenue",
			"phone": "944-708-3812"
		},
		{
			"name": "Mart",
			"email": "mibbitson1d@thetimes.co.uk",
			"address": "54529 Magdeline Hill",
			"phone": "581-893-9603"
		},
		{
			"name": "Evelyn",
			"email": "emackeig1e@pinterest.com",
			"address": "25724 Hauk Road",
			"phone": "264-565-1154"
		},
		{
			"name": "Rowney",
			"email": "rbernardon1f@nydailynews.com",
			"address": "94089 Moland Circle",
			"phone": "872-365-7863"
		},
		{
			"name": "Pate",
			"email": "porriss1g@cloudflare.com",
			"address": "072 Towne Avenue",
			"phone": "621-583-0725"
		},
		{
			"name": "Reeta",
			"email": "raingel1h@ow.ly",
			"address": "557 Talisman Crossing",
			"phone": "293-318-8772"
		},
		{
			"name": "Oliviero",
			"email": "obean1i@sakura.ne.jp",
			"address": "6 Carberry Court",
			"phone": "372-718-4897"
		},
		{
			"name": "Homere",
			"email": "hbutner1j@ameblo.jp",
			"address": "15 Pennsylvania Point",
			"phone": "596-159-5185"
		},
		{
			"name": "Therine",
			"email": "tpreuvost1k@bloomberg.com",
			"address": "115 Mitchell Street",
			"phone": "567-357-6474"
		},
		{
			"name": "Devland",
			"email": "ddachs1l@posterous.com",
			"address": "7500 Mariners Cove Pass",
			"phone": "908-460-4103"
		},
		{
			"name": "Gray",
			"email": "gpilmer1m@google.com",
			"address": "1640 Darwin Terrace",
			"phone": "577-919-6988"
		},
		{
			"name": "Saxe",
			"email": "slivett1n@smh.com.au",
			"address": "25 Clyde Gallagher Point",
			"phone": "808-769-8868"
		},
		{
			"name": "Ezequiel",
			"email": "etottman1o@businesswire.com",
			"address": "28002 Pepper Wood Way",
			"phone": "698-515-7761"
		},
		{
			"name": "Hugues",
			"email": "hhalcro1p@tiny.cc",
			"address": "67383 6th Place",
			"phone": "976-581-7493"
		},
		{
			"name": "Madge",
			"email": "mschutt1q@icq.com",
			"address": "915 Cody Way",
			"phone": "410-491-9313"
		},
		{
			"name": "Melamie",
			"email": "mhaycroft1r@tinyurl.com",
			"address": "10126 Oxford Place",
			"phone": "964-453-3117"
		},
		{
			"name": "Ashla",
			"email": "aottam1s@nature.com",
			"address": "2 Scoville Junction",
			"phone": "525-207-2492"
		},
		{
			"name": "Emerson",
			"email": "elunk1t@elpais.com",
			"address": "1 Gina Park",
			"phone": "891-210-4265"
		},
		{
			"name": "Ashil",
			"email": "aaltoft1u@dot.gov",
			"address": "9635 Granby Avenue",
			"phone": "944-756-6428"
		},
		{
			"name": "Dulsea",
			"email": "dverillo1v@fda.gov",
			"address": "4293 Oriole Point",
			"phone": "948-102-1816"
		},
		{
			"name": "Caressa",
			"email": "ckuzemka1w@smugmug.com",
			"address": "7 Atwood Junction",
			"phone": "747-885-5523"
		},
		{
			"name": "Orville",
			"email": "ostayt1x@admin.ch",
			"address": "8799 Dexter Crossing",
			"phone": "194-919-8200"
		},
		{
			"name": "Alysa",
			"email": "achasemoore1y@amazonaws.com",
			"address": "50 Toban Way",
			"phone": "980-970-4151"
		},
		{
			"name": "Judith",
			"email": "jcashmore1z@dagondesign.com",
			"address": "80 Russell Alley",
			"phone": "783-114-1778"
		},
		{
			"name": "Shani",
			"email": "sstanner20@cafepress.com",
			"address": "40 Emmet Circle",
			"phone": "470-798-6517"
		},
		{
			"name": "Alfie",
			"email": "aclarke21@unicef.org",
			"address": "832 Sherman Road",
			"phone": "803-591-8564"
		},
		{
			"name": "Rocky",
			"email": "rrattenberie22@businesswire.com",
			"address": "6 Shoshone Avenue",
			"phone": "187-958-3963"
		},
		{
			"name": "Hal",
			"email": "hstoddard23@cnbc.com",
			"address": "08622 Killdeer Road",
			"phone": "892-274-6748"
		},
		{
			"name": "Anna-diane",
			"email": "ahalifax24@ow.ly",
			"address": "9 John Wall Drive",
			"phone": "413-189-4884"
		},
		{
			"name": "Zak",
			"email": "zgodmar25@gnu.org",
			"address": "90 Lindbergh Circle",
			"phone": "252-217-1369"
		},
		{
			"name": "Giuditta",
			"email": "gclipsham26@prlog.org",
			"address": "8136 Reinke Road",
			"phone": "353-996-1377"
		},
		{
			"name": "Shae",
			"email": "scisneros27@discovery.com",
			"address": "3 8th Road",
			"phone": "542-126-0917"
		},
		{
			"name": "Lacy",
			"email": "lwardingley28@elpais.com",
			"address": "89369 Morning Center",
			"phone": "360-628-0121"
		},
		{
			"name": "Windham",
			"email": "wfebvre29@irs.gov",
			"address": "82 Westport Drive",
			"phone": "227-836-9861"
		},
		{
			"name": "Danie",
			"email": "dpimme2a@yale.edu",
			"address": "5185 Weeping Birch Way",
			"phone": "351-271-9090"
		},
		{
			"name": "Linnell",
			"email": "lsmetoun2b@virginia.edu",
			"address": "9374 Derek Drive",
			"phone": "958-113-2232"
		},
		{
			"name": "Vitia",
			"email": "vdabel2c@feedburner.com",
			"address": "118 Bluejay Avenue",
			"phone": "597-876-7334"
		},
		{
			"name": "Taryn",
			"email": "tbulcock2d@wsj.com",
			"address": "898 Dennis Terrace",
			"phone": "195-568-2417"
		},
		{
			"name": "Mead",
			"email": "mhamby2e@aboutads.info",
			"address": "737 Emmet Court",
			"phone": "684-575-2552"
		},
		{
			"name": "Dayna",
			"email": "dbudibent2f@spiegel.de",
			"address": "04126 Superior Court",
			"phone": "380-433-7210"
		},
		{
			"name": "Katrina",
			"email": "kdarrach2g@vk.com",
			"address": "5 American Place",
			"phone": "629-529-5346"
		},
		{
			"name": "Linell",
			"email": "llaflin2h@spotify.com",
			"address": "12552 Meadow Ridge Way",
			"phone": "908-776-4029"
		},
		{
			"name": "Isa",
			"email": "islateford2i@typepad.com",
			"address": "76 Bartillon Place",
			"phone": "378-231-4703"
		},
		{
			"name": "Mason",
			"email": "mdavidofski2j@usgs.gov",
			"address": "517 Jackson Park",
			"phone": "156-160-6151"
		},
		{
			"name": "Brucie",
			"email": "bstanmore2k@technorati.com",
			"address": "498 Moulton Drive",
			"phone": "137-389-2373"
		},
		{
			"name": "Lowe",
			"email": "ldenley2l@nih.gov",
			"address": "128 Melody Pass",
			"phone": "610-672-3693"
		},
		{
			"name": "Lindon",
			"email": "lordemann2m@com.com",
			"address": "0884 Westend Terrace",
			"phone": "625-506-4354"
		},
		{
			"name": "Hali",
			"email": "hhess2n@imgur.com",
			"address": "73 Linden Avenue",
			"phone": "468-366-9769"
		},
		{
			"name": "Gerti",
			"email": "gheinecke2o@dropbox.com",
			"address": "4 Northfield Drive",
			"phone": "144-750-5388"
		},
		{
			"name": "Robbie",
			"email": "rbeaford2p@bandcamp.com",
			"address": "7250 Mitchell Plaza",
			"phone": "786-366-1768"
		},
		{
			"name": "Thia",
			"email": "tjefferys2q@taobao.com",
			"address": "01 Moose Terrace",
			"phone": "871-876-2675"
		},
		{
			"name": "Cosette",
			"email": "clearmonth2r@shareasale.com",
			"address": "15540 Hoard Avenue",
			"phone": "300-581-8183"
		}
	];

	employeesdata.forEach(employee => {
		console.log(employee);
		db.collection('employees').add({
				name: employee.name,
				email: employee.email,
				address: employee.address,
				phone: employee.phone
			}).then(function () {
				console.log("Document successfully written!");
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});
}

$(document).ready(function () {

	let latestDoc = null;

	// LOAD INITIAL DATA
	displayEmployees();

	// LOAD MORE
	$(document).on('click', '.js-loadmore', function () {
		displayEmployees(latestDoc);
	});

	// ADD EMPLOYEE
	$("#add-employee-form").submit(function (event) {
		event.preventDefault();
		let employeeName = $('#employee-name').val();
		let employeeEmail = $('#employee-email').val();
		let employeeAddress = $('#employee-address').val();
		let employeePhone =  $('#employee-phone').val();
		db.collection('employees').add({
			name: employeeName,
			email: employeeEmail,
			address: employeeAddress,
			phone: employeePhone
			}).then(function (docRef) {
				console.log("Document written with ID: ", docRef.id);
				$("#addEmployeeModal").modal('hide');

				let newEmployee =
				`<tr data-id="${docRef.id}">
						<td>
								<span class="custom-checkbox">
										<input type="checkbox" id="${docRef.id}" name="options[]" value="${docRef.id}">
										<label for="${docRef.id}"></label>
								</span>
						</td>
						<td class="employee-name">${employeeName}</td>
						<td class="employee-email">${employeeEmail}</td>
						<td class="employee-address">${employeeAddress}</td>
						<td class="employee-phone">${employeePhone}</td>
						<td>
								<a href="#" id="${docRef.id}" class="edit js-edit-employee"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
								</a>
								<a href="#" id="${docRef.id}" class="delete js-delete-employee"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
								</a>
						</td>
				</tr>`;

			$('#employee-table tbody').prepend(newEmployee);
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});

	// UPDATE EMPLOYEE
	$(document).on('click', '.js-edit-employee', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#edit-employee-form').attr('edit-id', id);
		db.collection('employees').doc(id).get().then(function (document) {
			if (document.exists) {
				$('#edit-employee-form #employee-name').val(document.data().name);
				$('#edit-employee-form #employee-email').val(document.data().email);
				$('#edit-employee-form #employee-address').val(document.data().address);
				$('#edit-employee-form #employee-phone').val(document.data().phone);
				$('#editEmployeeModal').modal('show');
			} else {
				console.log("No such document!");
			}
		}).catch(function (error) {
			console.log("Error getting document:", error);
		});
	});

	$("#edit-employee-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('edit-id');
		let employeeName = $('#edit-employee-form #employee-name').val();
		let employeeEmail = $('#edit-employee-form #employee-email').val();
		let employeeAddress = $('#edit-employee-form #employee-address').val();
		let employeePhone =  $('#edit-employee-form  #employee-phone').val();

		db.collection('employees').doc(id).update({
			name: employeeName,
			email: employeeEmail,
			address: employeeAddress,
			phone: employeePhone
		});

		$('#editEmployeeModal').modal('hide');

		// SHOW UPDATED DATA ON BROWSER
		$('tr[data-id=' + id + '] td.employee-name').html(employeeName);
		$('tr[data-id=' + id + '] td.employee-email').html(employeeEmail);
		$('tr[data-id=' + id + '] td.employee-address').html(employeeAddress);
		$('tr[data-id=' + id + '] td.employee-phone').html(employeePhone);
	});

	// DELETE EMPLOYEE
	$(document).on('click', '.js-delete-employee', function (e) {
		e.preventDefault();
		let id = $(this).attr('id');
		$('#delete-employee-form').attr('delete-id', id);
		$('#deleteEmployeeModal').modal('show');
	});

	$("#delete-employee-form").submit(function (event) {
		event.preventDefault();
		let id = $(this).attr('delete-id');
		if (id != undefined) {
			db.collection('employees').doc(id).delete()
				.then(function () {
					console.log("Document successfully delete!");
					$("#deleteEmployeeModal").modal('hide');
				})
				.catch(function (error) {
					console.error("Error deleting document: ", error);
				});
		} else {
			let checkbox = $('table tbody input:checked');
			checkbox.each(function () {
				db.collection('employees').doc(this.value).delete()
					.then(function () {
						console.log("Document successfully delete!");
						displayEmployees();
					})
					.catch(function (error) {
						console.error("Error deleting document: ", error);
					});
			});
			$("#deleteEmployeeModal").modal('hide');
		}
	});

	// SEARCH
	$("#search-name").keyup(function () {
		$('#employee-table tbody').html('');
		let nameKeyword = $("#search-name").val();
		console.log(nameKeyword);
		employeeRef.orderBy('name', 'asc').startAt(nameKeyword).endAt(nameKeyword + "\uf8ff").get()
			.then(function (documentSnapshots) {
				documentSnapshots.docs.forEach(doc => {
					renderEmployee(doc);
				});
			});
	});

	// RESET FORMS
	$("#addEmployeeModal").on('hidden.bs.modal', function () {
		$('#add-employee-form .form-control').val('');
	});

	$("#editEmployeeModal").on('hidden.bs.modal', function () {
		$('#edit-employee-form .form-control').val('');
	});
});

// CENTER MODAL
(function ($) {
	"use strict";

	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find(".modal-dialog"),
			offset = ($(window).height() - $dialog.height()) / 2,
			bottomMargin = parseInt($dialog.css('marginBottom'), 10);

		// Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal
		if (offset < bottomMargin) offset = bottomMargin;
		$dialog.css("margin-top", offset);
	}

	$(document).on('show.bs.modal', '.modal', centerModal);
	$(window).on("resize", function () {
		$('.modal:visible').each(centerModal);
	});
}(jQuery));