Ext.define('module.custom.komec.mtrl.po.purcisttwork.PurcIsttWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.PurcOrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WrhsPopup',
	],
	models	: [
		'module.custom.komec.mtrl.po.purcisttwork.model.PurcIsttWork',
		'module.custom.komec.mtrl.po.purcisttwork.model.PurcIsttWorkMaster',
//		'module.custom.komec.mtrl.po.purcisttwork.model.PurcIsttWorkLabelPopup',
		'module.custom.komec.mtrl.po.purcisttwork.model.PurcIsttWorkDetail'
	],
	stores	: [
		'module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWork',
		'module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWorkMaster',
		'module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWorkDetail',
//		'module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWorkLabelPopup',
		'module.custom.komec.mtrl.po.purcisttwork.store.PurcIsttWorkExprMaster'
	],
	views	: [
		'module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkLayout',
		'module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkListerMaster',
		'module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkListerDetail',
		'module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkLister',
		'module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkSearch',
		'module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkListerSearch',
		'module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkLabelPopup',
		'module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkExprMaster',
		'module.custom.komec.mtrl.po.purcisttwork.view.PurcIsttWorkExprPopup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-purcisttwork-layout #mainpanel'							: { tabchange : me.mainTabChange },
			'module-purcisttwork-layout button[action=selectAction]'		: { click : me.selectAction	},		// 조회
			// lister master event
			'module-purcisttwork-lister-master button[action=deleteAction]'	: { click : me.deleteAction},		// 삭제
			'module-purcisttwork-lister-master button[action=exportAction]'	: { click : me.exportAction1},		// 엑셀
			'module-purcisttwork-lister-master button[action=labelAction]'	: { click : me.labelAction},		// 코멕라벨발행
			// lister detail event
			'module-purcisttwork-lister-detail button[action=exportAction]'	: { click : me.exportAction2},		// 엑셀
			// lister event
			'module-purcisttwork-lister button[action=updateAction]'		: { click : me.updateAction	},		// 저장
			'module-purcisttwork-lister button[action=cancelAction]'		: { click : me.cancelAction	},		// 취소
			//lister search
			'module-purcisttwork-lister-search button[action=selectAction2]': { click : me.selectAction2},		// 조회
			//listermaster
			'module-purcisttwork-lister-master' : {
				selectionchange	: me.attachRecord
			},
			//exprmaster
			'module-purcisttwork-expr-master button[action=exportAction3]'	: { click : me.exportAction3},		// 엑셀
			//exprpopup
			'module-purcisttwork-expr-master button[action=popupAction]'		: { click : me.popupAction}		// 팝업창
		});
		me.callParent(arguments);
	},
	pocket  : {
		layout		: function () { return Ext.ComponentQuery.query('module-purcisttwork-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-purcisttwork-search') [0] },
		lister		: function () { return Ext.ComponentQuery.query('module-purcisttwork-lister') [0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-purcisttwork-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-purcisttwork-lister-detail')[0] },
		listersearch: function () { return Ext.ComponentQuery.query('module-purcisttwork-lister-search')[0] },
		labelpopup  : function () { return Ext.ComponentQuery.query('module-purcisttwork-label-popup')[0] },
		exprmaster  : function () { return Ext.ComponentQuery.query('module-purcisttwork-expr-master')[0] },
		exprpopup   : function () { return Ext.ComponentQuery.query('module-purcisttwork-expr-popup')[0] }
	},

	mainTabChange : function (tabPanel, newCard, oldCard ){
		var  me    = this,
			index = tabPanel.items.indexOf(newCard),
			gPage = tabPanel.items.indexOf(newCard)
		;

		if(index == 0){
			me.pocket.search().down('[name=collapsed]').collapse();
			me.pocket.search().down('[name=expr_stat]').setVisible(false);
		}else if (index == 1){
			me.pocket.search().down('[name=collapsed]').expand();
//			me.pocket.search().down('[name=expr_stat]').setVisible(false);
		}else if (index == 2){
			me.pocket.search().down('[name=collapsed]').expand();
			me.pocket.search().down('[name=expr_stat]').setVisible(true);
		}

		switch (index) {
			case 1: {
				me.selectAction();
			};
			default : {
			}
		};
	},

	//조회
	selectAction : function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			exprmaster = me.pocket.exprmaster(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(tindex==1){
			if(param.invc_date1>param.invc_date2){
				Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				listermaster.select({
					callback:function(records, operation, success) {
						if (success) {
							listermaster.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id,mes_system_type:_global.options.mes_system_type}));
			}
		}else if(tindex==2){
				if(param.invc_date1>param.invc_date2){
					Ext.Msg.alert("알림","조회기간을 다시 입력해주십시오.");
				}else{
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
					mask.show();
					exprmaster.select({
						callback:function(records, operation, success) {
							if (success) {
							} else { }
							mask.hide();
						}, scope:me
					}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id,mes_system_type:_global.options.mes_system_type}));
				}
		}else if(tindex==0){
			Ext.Msg.alert("알림","입고등록의 조회를 클릭 해 주십시오.");
		}
	},

	attachRecord : function( smodel, record ){
		var me	= this,
		listermaster= smodel ? smodel.view.ownerCt : me.pocket.listermaster(),
		record		= record ? record[0] : listermaster.getSelectionModel().getSelection()[0]
		;
		me.pocket.listerdetail().eraser() ;
		if (record) {
		}
	},

	selectAction2 : function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.listersearch(),
			param  = search.getValues()
		;
		if(param.deli_date1>param.deli_date2 || param.invc_date1>param.invc_date2){
			Ext.Msg.alert("알림","일자를 다시입력해 주십시오.");
		}else{
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
//						lister.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id,mes_system_type:_global.options.mes_system_type}) );
		}
	},

	updateAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			changes = lister.getStore().getUpdatedRecords().length,
			search = me.pocket.listersearch(),
			values = search.getValues(),
			records = lister.getSelectionModel().getSelection(),
			new_invc_numb = '',
			new_invc_numb2 = '',
			new_line_seqn
		;
		if(values.istt_wrhs_idcd==null || values.istt_wrhs_idcd ==''){
			Ext.Msg.alert('알림','입고창고를 선택해주세요.');
			return;
		}
		if(_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
			if(values.invc_date==null || values.invc_date ==''){
				Ext.Msg.alert('알림','입고일자를 선택해주세요.');
				return;
			}
		}

		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
			var x = 1;	//순번
			var msg = "";
			var arr = [];
			var new_invc = [];
			var lott_numb = "";

			Ext.each(lister.getStore().getUpdatedRecords(),function(record){
				if(_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
					if((record.get('lott_numb') == null || record.get('lott_numb') == "") && record.get('istt_qntt') > 0) {
						msg = "Batch No를 입력해주십시오.";
					}
				}

				if(record.get('istt_qntt') == null || record.get('istt_qntt')==''){
					if(record.get('lott_numb') != null && record.get('lott_numb') != ""){
						msg = "입고수량을 반드시 입력하십시오.";
					}else{
						record.dirty = false;
					}
				}
			})

			if(msg!=""){
				Ext.Msg.alert('알림',msg);
				return;
			}

			// 로트번호 중복 체크
			if(_global.options.mes_system_type.toUpperCase() == 'SJFLV') {
				var lottNumb    = "";
				var lottDupCont = 0;
				var lottDupNumb = "";

				Ext.each(lister.getStore().getUpdatedRecords(),function(record){
					if((record.get('lott_numb') != null && record.get('lott_numb') != "") && record.get('istt_qntt') > 0) {
						if (lottNumb.match(record.get('lott_numb') + ",")) {
							lottDupCont++;
							if (!lottDupNumb.match(record.get('lott_numb') + ",")) {
								lottDupNumb += record.get('lott_numb') + ",";
							}
						} else {
							lottNumb += record.get('lott_numb') + ",";
						}
					}
				});

				if (lottDupCont > 0) {
					Ext.Msg.alert('알림', lottDupCont + "건의 Batch No가 중복되었습니다.<p><p>" + lottDupNumb.slice(0, lottDupNumb.length - 1));
					return;
				}
			}

			Ext.each(lister.getStore().getUpdatedRecords(),function(record){
				if(arr.indexOf(record.get('cstm_idcd')) == -1){
					x = 1;
					arr.push(record.get('cstm_idcd'));
					Ext.Ajax.request({
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm	: 'purc_istt_mast'
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc.push(result.records[0].seq);
						}
					});

					record.set('new_line_seqn',x);
					record.set('new_invc_numb',new_invc[arr.indexOf(record.get('cstm_idcd'))]);
					record.set('istt_wrhs_idcd',values.istt_wrhs_idcd);
					record.set('invc_date',values.invc_date);
					record.set('bzpl_idcd',values.bzpl_idcd);
				}else{
					x++;
					record.set('new_line_seqn',x);
					record.set('new_invc_numb',new_invc[arr.indexOf(record.get('cstm_idcd'))]);
					record.set('istt_wrhs_idcd',values.istt_wrhs_idcd);
					record.set('bzpl_idcd',values.bzpl_idcd);
				}

			});

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
				lister.getStore().sync({
				success : function(operation){ store.reload(); },
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
				}
			});
		}
	},

	cancelAction : function() {
		var me	= this,
		lister  = me.pocket.lister(),
		search  = me.pocket.search(),
		param   = search.getValues(),
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));

	},
	deleteAction : function() {
		var me	= this,
			lister	= me.pocket.listermaster(),
			records	= lister.getSelectionModel().getSelection(),
			store	= lister.getStore(),
			chk		= 0,
			msg		= ''
		;
		for (var i = 0; i < records.length; i++) {
			if(records[i].get('publ_date') || records[i].get('expr_date')){
				chk = 1;
				msg+= records[i].get('invc_numb')+" ( "+(i+1)+"번 )</br>";
			}
		}
		if(chk){
			Ext.Msg.alert('알림','입고번호</br>'+msg+'은(는) 매입처리되어 삭제할 수 없습니다.');
			return;
		}
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					store.remove (records);
					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
					mask.show();
					store.sync({
						success : function(operation){ },
						failure : function(operation){ },
						callback: function(operation){
							mask.hide();
							store.reload();
						}
					});
				}
			}
		});
	},


	labelAction : function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			select = me.pocket.listermaster().getSelectionModel().getSelection(),
			record = listermaster.getSelectionModel().getSelection(),
			jrf = 'komec_label.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = listermaster.getSelectionModel().getSelection();
		if(!records || records.length<1) {
			Ext.Msg.alert("알림", "입고리스트 목록중 1건이상을 선택하여주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;
	},

	labelAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			select = me.pocket.listermaster().getSelectionModel().getSelection(),
			jrf = '',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = listermaster.getSelectionModel().getSelection();

		if(!records || records.length<1){
			Ext.Msg.alert("알림","라벨발행할 수주목록을 선택해주십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-purcisttwork-label-popup'
		});
		var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(records[0].data.invc_numb);
//		var numb = Ext.ComponentQuery.query('#cstm_idcd')[0].setValue(records[0].data.cstm_idcd);
	},


	popupAction : function(){
		var me = this
			exprmaster = me.pocket.exprmaster(),
			records = exprmaster.getSelectionModel().getSelection()
		;
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림","유통기한 처리품목을 선택해주십시오.");
			return;
		}
		resource.loadPopup({
			widget	: 'module-purcisttwork-expr-popup',
			param	: { invc_numb : records[0].data.invc_numb,
						line_seqn : records[0].data.line_seqn,
						lott_numb : records[0].data.lott_numb,
						proc_date : records[0].data.proc_date,
						work_cont : records[0].data.work_cont
			}
		});
	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction2 : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction3 : function() {
		this.pocket.exprmaster().writer({enableLoadMask:true});
	}
});