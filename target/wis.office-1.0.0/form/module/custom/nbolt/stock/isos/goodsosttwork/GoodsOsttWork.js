Ext.define('module.custom.nbolt.stock.isos.goodsosttwork.GoodsOsttWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster1',
		'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster2',
		'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail1',
		'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail2',
		'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkInvoice',
		'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerLister2',
		'module.custom.nbolt.stock.isos.goodsosttwork.model.GoodsOsttWorkWorkerLister1'
	],
	stores	: [
		'module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1',
		'module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster2',
		'module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1',
		'module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail2',
		'module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkWorkerLister1',
		'module.custom.nbolt.stock.isos.goodsosttwork.store.GoodsOsttWorkWorkerLister2'
	],
	views	: [
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkLayout',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster1',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster2',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail1',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail2',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkSearch',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerSearch',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerLister1',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerLister2',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkWorkerEditor',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkItemPopup',
		'module.custom.nbolt.stock.isos.goodsosttwork.view.GoodsOsttWorkItem2Popup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-nbolt-goodsosttwork-layout #mainpanel'					: { tabchange : me.mainTabChange	},
			'module-nbolt-goodsosttwork-layout button[action=selectAction]'	: { click : me.selectAction			},		// 조회
			// lister event
			'module-nbolt-goodsosttwork-lister-master1 button[action=printAction]' : { click : me.printAction	},		// 거래명세서출력
			'module-nbolt-goodsosttwork-lister-master1 button[action=exportAction]': { click : me.exportAction	},		// 엑셀
			'module-nbolt-goodsosttwork-lister-master1 button[action=insertAction]': { click : me.insertAction	},		// 신규
			'module-nbolt-goodsosttwork-lister-master1 button[action=deleteAction]': { click : me.deleteAction	},		// 삭제
			// workerlister event
			'module-nbolt-goodsosttwork-layout button[action=enrollment]'  	: { click : me.enrollment      		},		//1건등록(>)
			'module-nbolt-goodsosttwork-layout button[action=remove]'      	: { click : me.remove          		},		//1건삭제(<)
			'module-nbolt-goodsosttwork-worker-lister2 button[action=updateAction]': { click : me.updateAction	},		// 저장
			'module-nbolt-goodsosttwork-worker-lister2 button[action=cancelAction]': { click : me.cancelAction	},		// 취소
			// lister search
			'module-nbolt-goodsosttwork-worker-search button[action=selectAction2]': { click : me.selectAction2	},		// 조회
			'module-nbolt-goodsosttwork-lister-detail1 button[action=printAction]' : { click : me.printAction2 	},		// 바코드발행
			'module-nbolt-goodsosttwork-lister-detail1 button[action=exportAction]': { click : me.exportDetailAction},	// 엑셀
			'module-nbolt-goodsosttwork-lister-master2 button[action=exportAction]': { click : me.exportAction1	},		// 엑셀
			'module-nbolt-goodsosttwork-lister-master2 button[action=PrintAction1]': { click : me.printAction1	},		// 부품식별표 발행
			'module-nbolt-goodsosttwork-lister-detail2 button[action=exportAction]': { click : me.exportDetailAction1},	// 엑셀
			'module-nbolt-goodsosttwork-worker-lister1': {
				itemdblclick : me.selectItem1 ,
			},
			'module-nbolt-goodsosttwork-worker-lister2': {
				itemdblclick : me.selectItem2 ,
			},
			'module-nbolt-goodsosttwork-lister-master1' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord
			},
			'module-nbolt-goodsosttwork-lister-master2' : {
				itemdblclick : me.selectLister2 ,
				selectionchange : me.attachRecord
			}
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-search')[0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-lister-master2')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-lister-detail1')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-lister-detail2')[0] },
		workersearch	: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-worker-search')[0] },
		lister1			: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-worker-lister1')[0] },
		lister2			: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-worker-lister2')[0] },
		editor			: function () { return Ext.ComponentQuery.query('module-nbolt-goodsosttwork-worker-editor')[0] }
	},

	//조회
	selectAction : function() {
		var me = this,
			master1 = me.pocket.listermaster1(),
			master2 = me.pocket.listermaster2(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex == 1){
			Ext.Msg.alert("알림","출고등록의 조회를 눌러주십시오.");
		}else{
			if(param.work_strt_dttm1>param.work_strt_dttm2) {
				Ext.Msg.alert("알림", "조회기간을 다시 입력해주십시오.");
			}else{
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				if ( tindex == 0 ) {
					master1.select({
						callback:function(records, operation, success) {
							if (success) {
								master1.getSelectionModel().select(0);
							} else { }
							mask.hide();
						}, scope:me
					}, Ext.merge( param, {stor_id : _global.stor_id}));
				}else if(tindex == 2){
					master2.select({
						callback:function(records, operation, success) {
							if (success) {
								master2.getSelectionModel().select(0);
							} else { }
							mask.hide();
						}, scope:me
					}, Ext.merge( param, {stor_id : _global.stor_id}));
				}
			}
		}
	},

	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			lister1 = me.pocket.lister1(),
			lister2 = me.pocket.lister2(),
			store1 = lister1.getStore(),
			store2 = lister2.getStore(),
			search = me.pocket.workersearch(),
			param  = search.getValues(),
			record = undefined
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister1.select({
			callback:function(records, operation, success) {
				if (success) {
					lister1.getSelectionModel().select(0);
					store2.each(function(record){
						var val = store1.findRecord('find_name',record.get('find_name'),0,false,true,true);
						store1.remove(val);
					})
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}));

//		record = Ext.create( store2.model.modelName , {
//			drtr_idcd		: drtr_idcd,
//			disp_seqn		: ostt_date,
//			product			: param,
//		});

	},

	// > enrollment //TODO ENROLL
	enrollment:function() {
		var me			= this,
			record		= new Array(),
			lister1		= me.pocket.lister1(),
			lister2		= me.pocket.lister2(),
			store1		= lister1.getStore(),
			store2		= lister2.getStore(),
			mrecords	= lister1.getSelectionModel().getSelection(),
			mrecord		= mrecords[0]
			selects		= lister1.getSelectionModel().getSelection();
		;
		if(selects.length == 0){
			Ext.Msg.alert("알림", "추가할 전표를 선택하여 주십시오.");
		}else{
			store1.remove(selects);
			store2.add(selects);

			Ext.each(selects,function(records){
				var	idx = store2.indexOf(records),	//store index find
					str2 = store2.getAt(idx)		//store get records by index
				;
				str2.set('ostt_qntt2',str2.get('unpaid'));
				lister2.cellEditAfter('',str2);
			})
		}
	},

	// < remove
	remove : function() {
		var me = this,
			lister1		= me.pocket.lister1(),
			lister2		= me.pocket.lister2(),
			store1		= lister1.getStore(),
			store2		= lister2.getStore(),
			selects		= lister2.getSelectionModel().getSelection()
		;
		if(selects.length == 0){
			Ext.Msg.alert("알림","삭제할 전표를 선택하여 주십시오.");
		}else{
			store1.add(selects);
			store2.remove(selects);
		}
		store1.sync({
			callback : function() {
				store2.reload();
			}
		});
	},
	selectItem1:function(){
		var	me			= this,
			lister1		= me.pocket.lister1(),
			lister2		= me.pocket.lister2(),
			store1		= lister1.getStore(),
			store2		= lister2.getStore(),
			records		= lister1.getSelectionModel().getSelection()[0]
		;
		if(records.length == 0){
			Ext.Msg.alert("알림", "추가할 전표를 선택하여 주십시오.");
		}else{
			store1.remove(records);
			store2.add(records);

			var	idx = store2.indexOf(records),	//store index find
				str2 = store2.getAt(idx)		//store get records by index
			;
			str2.set('ostt_qntt2',str2.get('unpaid'));
			lister2.cellEditAfter('',str2);
		}
	},
	selectItem2:function(){
		var	me			= this,
			lister1		= me.pocket.lister1(),
			lister2		= me.pocket.lister2(),
			store1		= lister1.getStore(),
			store2		= lister2.getStore(),
			records		= lister2.getSelectionModel().getSelection()[0]
		;
		store1.add(records);
		store2.remove(records);
	},
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister2(),
			master = me.pocket.listermaster1(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords(),
			jrf = 'invoice3.jrf',
			resId = _global.hq_id.toUpperCase(),
			values = editor.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(changes.length != 0){
//			if(values.wrhs_idcd==""){
//				Ext.Msg.alert('알림','출고창고를 선택해주세요.');
//				return;
//			}
			var msg = "";
			var arr = new Array();
			//object에 json처럼 cstm_idcd, max_seqn,new_invc_numb 넣어야함(json배열 형태로해서 cstm_idcd 없으면 json생성 후 push)
			Ext.each(lister.getStore().getUpdatedRecords(),function(record){
				var length = Array.isArray(arr)?arr.findIndex(x => x.cstm_idcd == record.get('cstm_idcd')) : -1; //에러처럼 보이지만 에러아님.

				if(length == -1){
					var new_invc_numb = '';
					Ext.Ajax.request({
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm: 'sale_ostt_mast'
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							new_invc_numb = result.records[0].seq;
							arr.push({cstm_idcd:record.get('cstm_idcd'),new_invc_numb : result.records[0].seq, line_seqn : 1})
						}
					});
					record.set('new_line_seqn',1);
					record.set('new_invc_numb',new_invc_numb);
				}else{
					var af_seqn = arr[length].line_seqn+1;
					arr[length].line_seqn = af_seqn;
					record.set('new_line_seqn',af_seqn);
					record.set('new_invc_numb',arr[length].new_invc_numb);
				}
			});
			store.sync({
				success : function(operation){
					editor.getForm().reset();
					master.getStore().reload();
					lister.getStore().clearData();
					lister.getStore().loadData([],false);
					tpanel.items.indexOf(tpanel.setActiveTab(0));


				}, // 저장 성공시
				failure : function(operation){  }, // 저장 실패시 호출
				callback: function(operation){ }   // mask.hide();

			});


			if(_global.hq_id.toUpperCase() == "N1000NBOLT"){
				Ext.Msg.confirm("확인", "거래명세서를 출력 하시겠습니까?", function(button) {
					if (button == 'yes') {
						var arg = "invc_numb~";
						Ext.each(arr,function(record){
							arg += "\'"+record.new_invc_numb+"\',";
						})
						arg = arg.substring(0, arg.lastIndexOf(","));
						arg += "~";

						var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';

						Ext.Ajax.request({
							url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
						});
					}
				});
			}
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	cancelAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			master = me.pocket.listermaster1(),
			lister = me.pocket.lister2(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		editor.getForm().reset();
		master.getStore().reload();
		lister.getStore().clearData();
		lister.getStore().loadData([],false);
		tpanel.items.indexOf(tpanel.setActiveTab(0));
	},

	selectLister1:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster1(),
			detail = me.pocket.listerdetail1(),
			record = master.getSelectionModel().getSelection()[0]
		;
		detail.select({
			 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
		}, { invc_numb : record.get('invc_numb') });
	},

	selectLister2:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster2(),
			detail = me.pocket.listerdetail2(),
			record = master.getSelectionModel().getSelection()[0]
		;
		detail.select({
			 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
		}, { invc_numb : record.get('invc_numb') });
	},

	attachRecord:function( grid, records ){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1(),
			listerdetail2 = me.pocket.listerdetail2()
		;
//		console.log(records);
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);

		listerdetail2.getStore().clearData();
		listerdetail2.getStore().loadData([],false);
	},

	insertAction:function(){
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister1(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(1));
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master1		= me.pocket.listermaster1(),
			master2		= me.pocket.listermaster2(),
			search		= me.pocket.search(),
			search2		= me.pocket.workersearch(),
			lister		= me.pocket.lister1(),
			editor		= me.pocket.editor(),
			param		= search.getValues(),
			param2		= search2.getValues(),
			tindex		= tabPanel.items.indexOf(newCard)
		;
//		editor.getStore().clearData();
//		editor.getStore().loadData([],false);
//		editor.getForm().reset();

		editor.down('[name=drtr_idcd]').setValue(_global.login_id);
		editor.down('[name=drtr_name]').setValue(_global.login_nm);
		editor.down('[name=ostt_date]').setValue(new Date());

		if(tindex == 0){
			me.pocket.search().down('[name=collapsed]').expand();
			master1.select({
				callback:function(records, operation, success) {
					if (success) {
						master1.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if(tindex == 1){
			me.pocket.search().down('[name=collapsed]').collapse();
			me.selectAction2();
		}else if(tindex == 2){
			me.pocket.search().down('[name=collapsed]').expand();
			master2.select({
				callback:function(records, operation, success) {
					if (success) {
						master2.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},


	deleteAction : function() {
		var me = this,
			lister = me.pocket.listermaster1(),
			detail = me.pocket.listerdetail1(),
			store  = lister.getStore(),
			select = lister.getSelectionModel().getSelection(),
			record = []
		;
		if(!select){
			Ext.Msg.alert("알림", "삭제하실 출고건을 선택하여 주십시오.");
		}else{
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					var arr = new Array();
					Ext.each(select,function(rec){
						arr.push({invc_numb : rec.get('invc_numb')});
					})
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/nbolt/stock/isos/goodsosttwork/set/deleteMaster.do',
						method		: "POST",
						async		: false,
						params	: {
							token : _global.token_id,
							param :JSON.stringify({
								records	: JSON.stringify(arr)
							})
						},
						success : function(response, request) {
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							store.reload();
							mask.hide();
						}
					});
				}
			});
		}
	},

	// 거래명세서출력
	printAction:function() {
		var me = this,
			listermaster1 = me.pocket.listermaster1(),
			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
			jrf = 'invoice3.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		if (!select) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}
		var arg = "invc_numb~";
		Ext.each(select,function(record){
			arg += "\'"+record.get('invc_numb')+"\',";
		})
		arg = arg.substring(0, arg.lastIndexOf(","));
		arg += "~";

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';

		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},


	// 뉴볼텍 바코드발행
	printAction2:function() {
		var me = this,
			master = me.pocket.listermaster1(),
			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
			jrf = 'NboltBarcode.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg = 'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
			});
		}
	},

	// 엑셀
	exportAction : function(self) {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},
	exportAction1 : function(self) {
		this.pocket.listermaster2().writer({enableLoadMask:true});
	},
	exportDetailAction1 : function(self) {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	},
});