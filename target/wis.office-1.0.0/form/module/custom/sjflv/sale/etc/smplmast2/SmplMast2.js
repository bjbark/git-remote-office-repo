Ext.define('module.custom.sjflv.sale.etc.smplmast2.SmplMast2', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.upload.BoardUpload',
		],

	models	: [
		'module.custom.sjflv.sale.etc.smplmast2.model.SmplMast2'
		],
	stores	: [
		'module.custom.sjflv.sale.etc.smplmast2.store.SmplMast2Lister',
		'module.custom.sjflv.sale.etc.smplmast2.store.SmplMast2Lister2',
		'module.custom.sjflv.sale.etc.smplmast2.store.SmplMast2Lister3',
		'module.custom.sjflv.sale.etc.smplmast2.store.SmplMast2Lister4',
		'module.custom.sjflv.sale.etc.smplmast2.store.SmplMast2Lister5'
	 	],
	views	: [
		'module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Layout',
		'module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Search',
		'module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Lister',
		'module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Lister2',
		'module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Lister3',
		'module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Lister4',
		'module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Lister5',
		'module.custom.sjflv.sale.etc.smplmast2.view.SmplMast2Editor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},


	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-smplmast2-layout #mainpanel'					: { tabchange : me.selectAction		},
			'module-smplmast2-layout button[action=selectAction]' : { click : me.selectAction },	// 조회

			// lister event
			'module-smplmast2-lister button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-smplmast2-lister button[action=cancelAction]' : { click : me.cancelAction },	// 취소

			// lister2 event
			'module-smplmast2-lister2 button[action=updateAction]' : { click : me.updateAction2 },	// 저장
			'module-smplmast2-lister2 button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			'module-smplmast2-lister2 button[action=cancelAction]' : { click : me.cancelAction2 },	// 취소

			// lister3 event
			'module-smplmast2-lister3 button[action=updateAction]' : { click : me.updateAction3 },	// 저장
			'module-smplmast2-lister3 button[action=deleteAction]' : { click : me.deleteAction2 },	// 삭제
			'module-smplmast2-lister3 button[action=cancelAction]' : { click : me.cancelAction3 },	// 취소

			// lister4 event
			'module-smplmast2-lister4 button[action=updateAction]' : { click : me.updateAction4 },	// 저장
			'module-smplmast2-lister4 button[action=cancelAction]' : { click : me.cancelAction4 },	// 취소

			// lister5 event
			'module-smplmast2-lister5 button[action=updateAction]' : { click : me.updateAction5 },	// 저장
			'module-smplmast2-lister5 button[action=cancelAction]' : { click : me.cancelAction5 },	// 취소

			'module-smplmast2-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-smplmast2-lister2 button[action=exportAction]' : { click : me.exportAction2 },	// 엑셀
			'module-smplmast2-lister3 button[action=exportAction]' : { click : me.exportAction3 },	// 엑셀
			'module-smplmast2-lister4 button[action=exportAction]' : { click : me.exportAction4 },	// 엑셀
			'module-smplmast2-lister5 button[action=exportAction]' : { click : me.exportAction5 },	// 엑셀
			// lister event
			'module-smplmast-search combobox[name=site_id]' : { select: me.selectLookup  }
		});
		me.callParent(arguments);
	},
	pocket :{
		layout : function () { return Ext.ComponentQuery.query('module-smplmast2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-smplmast2-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-smplmast2-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-smplmast2-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-smplmast2-lister3')[0] },
		lister4 : function () { return Ext.ComponentQuery.query('module-smplmast2-lister4')[0] },
		lister5 : function () { return Ext.ComponentQuery.query('module-smplmast2-lister5')[0] }
	},


	//조회
	selectAction:function(){
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			lister4 = me.pocket.lister4(),
			lister5 = me.pocket.lister5(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		if(tindex==0){
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues() , { stor_grp : _global.stor_grp ,  smpl_dvcd : 1 }));
		}else if(tindex==1){
			lister2.select({
				 callback:function(records, operation, success) {
					if (success) {
//						lister2.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp ,  smpl_dvcd : 2 }));
		}else if(tindex==2){
			lister3.select({
				 callback:function(records, operation, success) {
					if (success) {
//						lister3.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp ,  smpl_dvcd : 3 }));
		}else if(tindex==3){
			lister4.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister4.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp ,  smpl_dvcd : 4 }));
		}else if(tindex==4){
			lister5.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister5.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp ,  smpl_dvcd : 5 }));
		}
	},

	updateAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			store  = lister.getStore(),
			changes  = lister.getStore().getUpdatedRecords().length,
			change   = lister.getStore().data.items,
			length   = lister.getStore().data.items.length,
			remove   = lister.getStore().removed.length,
			cstm_idcd    = change[length-1].get('cstm_idcd');
			tpanel = me.pocket.layout().down('#mainpanel')
		;

		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.invc_numb == ''){
				chk = 1;
				break;
			}
		}

		if (changes == 0 && change.length == 0 && remove==0 ) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}else{
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무

			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		var store = lister.getStore();
		var msg = "";
		store.each(function(record){
			if(record.get('cstm_name')==""){
				msg = "거래처를 입력해주세요.";
				return false;
			}
			if(record.get('item_name')==""){
				msg = "샘플명을 입력해주세요.";
				return false;
			}
			if(record.get('spec_1fst')==""){
				msg = "규격1을 입력해주세요.";
				return false;
			}
		});
		if(msg!=""){
			Ext.Msg.alert('알림',msg);
			mask.hide();
			return;
		}
		lister.getStore().sync({
			success : function(operation){ me.selectAction();},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
			}
		});
	},

	updateAction2:function() {
		var me = this,
			lister = me.pocket.lister2(),
			store  = lister.getStore(),
			changes  = lister.getStore().getUpdatedRecords().length,
			change   = lister.getStore().data.items,
			length   = lister.getStore().data.items.length,
			remove   = lister.getStore().removed.length,
			tpanel = me.pocket.layout().down('#mainpanel')
		;

		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.invc_numb == ''){
				chk = 1;
				break;
			}
		}

		if (changes == 0 && change.length == 0 && remove==0 ) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}else{
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		var store = lister.getStore();
		var msg = "";
		store.each(function(record){
			if(record.get('cstm_name')==""){
				msg = "거래처를 입력해주세요.";
				return false;
			}
			if(record.get('item_name')==""){
				msg = "샘플명을 입력해주세요.";
				return false;
			}
			if(record.get('spec_1fst')==""){
				msg = "규격1을 입력해주세요.";
				return false;
			}
		});
		if(msg!=""){
			Ext.Msg.alert('알림',msg);
			mask.hide();
			return;
		}
		lister.getStore().sync({
			success : function(operation){ me.selectAction();},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
			}
		});
	},

	updateAction3:function() {
		var me = this,
			lister = me.pocket.lister3(),
			store  = lister.getStore(),
			changes  = lister.getStore().getUpdatedRecords().length,
			change   = lister.getStore().data.items,
			length   = lister.getStore().data.items.length,
			remove   = lister.getStore().removed.length,
			tpanel = me.pocket.layout().down('#mainpanel')
		;

		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.invc_numb == ''){
				chk = 1;
				break;
			}
		}

		if (changes == 0 && change.length == 0 && remove==0 ) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}else{
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		var store = lister.getStore();
		var msg = "";
		store.each(function(record){
			if(record.get('cstm_name')==""){
				msg = "거래처를 입력해주세요.";
				return false;
			}
			if(record.get('item_name')==""){
				msg = "샘플명을 입력해주세요.";
				return false;
			}
			if(record.get('spec_1fst')==""){
				msg = "규격1을 입력해주세요.";
				return false;
			}
		});
		if(msg!=""){
			Ext.Msg.alert('알림',msg);
			mask.hide();
			return;
		}
		lister.getStore().sync({
			success : function(operation){ me.selectAction();},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
			}
		});
	},

	updateAction4:function() {
		var me = this,
			lister = me.pocket.lister4(),
			store  = lister.getStore(),
			changes  = lister.getStore().getUpdatedRecords().length,
			change   = lister.getStore().data.items,
			length   = lister.getStore().data.items.length,
			remove   = lister.getStore().removed.length,
			tpanel = me.pocket.layout().down('#mainpanel')
		;

		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.invc_numb == ''){
				chk = 1;
				break;
			}
		}

		if (changes == 0 && change.length == 0 && remove==0 ) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}else{
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		var store = lister.getStore();
		var msg = "";
		store.each(function(record){
			if(record.get('cstm_name')==""){
				msg = "거래처를 입력해주세요.";
				return false;
			}
			if(record.get('item_name')==""){
				msg = "샘플명을 입력해주세요.";
				return false;
			}
			if(record.get('spec_1fst')==""){
				msg = "규격을 입력해주세요.";
				return false;
			}
		});
		if(msg!=""){
			Ext.Msg.alert('알림',msg);
			mask.hide();
			return;
		}
		lister.getStore().sync({
			success : function(operation){ me.selectAction();},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
			}
		});
	},

	updateAction5:function() {
		var me = this,
			lister = me.pocket.lister5(),
			store  = lister.getStore(),
			changes  = lister.getStore().getUpdatedRecords().length,
			change   = lister.getStore().data.items,
			length   = lister.getStore().data.items.length,
			remove   = lister.getStore().removed.length,
			tpanel = me.pocket.layout().down('#mainpanel')
		;

		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.invc_numb == ''){
				chk = 1;
				break;
			}
		}

		if (changes == 0 && change.length == 0 && remove==0 ) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}else{
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		var store = lister.getStore();
		var msg = "";
		store.each(function(record){
			if(record.get('item_name')==""){
				msg = "제품명을 입력해주세요.";
				return false;
			}
		});
		if(msg!=""){
			Ext.Msg.alert('알림',msg);
			mask.hide();
			return;
		}
		lister.getStore().sync({
			success : function(operation){ me.selectAction();},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
			}
		});
	},

	deleteAction:function() {
		var me = this,
			master = me.pocket.lister2(),
			store  = master.getStore(),
			select	= master.getSelectionModel().getSelection()[0]
		;


		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (select) {
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/sale/etc/smplmast2/set/delete.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: select.get('new_invc_numb'),
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							master.getStore().reload();
							if	(!result.success ){
								Ext.Msg.error(result.message );
								return;
							} else {
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						mask.hide();
						}
					});
				}
			});
		}
	},

	deleteAction2:function() {
		var me = this,
			master = me.pocket.lister3(),
			store  = master.getStore(),
			select	= master.getSelectionModel().getSelection()[0]
		;


		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (select) {
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/sale/etc/smplmast2/set/delete.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: select.get('new_invc_numb'),
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							master.getStore().reload();
							if	(!result.success ){
								Ext.Msg.error(result.message );
								return;
							} else {
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						mask.hide();
						}
					});
				}
			});
		}
	},



	//취소
	cancelAction : function() {
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.lister()
		;

		lister.getStore().reload();
	},

	cancelAction2 : function() {
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.lister2()
		;

		lister.getStore().reload();
	},

	cancelAction3 : function() {
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.lister3()
		;

		lister.getStore().reload();
	},

	cancelAction4 : function() {
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.lister4()
		;

		lister.getStore().reload();
	},

	cancelAction5 : function() {
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.lister5()
		;

		lister.getStore().reload();
	},


	//엑셀
	exportAction : function(self){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	exportAction2 : function(self){
		this.pocket.lister2().writer({enableLoadMask:true});
	},

	exportAction3 : function(self){
		this.pocket.lister3().writer({enableLoadMask:true});
	},

	exportAction4 : function(self){
		this.pocket.lister4().writer({enableLoadMask:true});
	},
	exportAction5 : function(self) {
		this.pocket.lister5().writer({enableLoadMask:true});
	},

});

