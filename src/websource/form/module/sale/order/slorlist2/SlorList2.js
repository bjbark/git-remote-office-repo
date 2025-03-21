Ext.define('module.sale.order.slorlist2.SlorList2', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3'
	],
	models	: [
		'module.sale.order.slorlist2.model.SlorList2Master',
		'module.sale.order.slorlist2.model.SlorList2Detail'
	],
	stores	: [
		'module.sale.order.slorlist2.store.SlorList2Master1',
		'module.sale.order.slorlist2.store.SlorList2Master2',
		'module.sale.order.slorlist2.store.SlorList2Master3',
		'module.sale.order.slorlist2.store.SlorList2Master4',
		'module.sale.order.slorlist2.store.SlorList2Master5',
		'module.sale.order.slorlist2.store.SlorList2Master6',
		'module.sale.order.slorlist2.store.SlorList2Detail'
	],
	views	: [
		'module.sale.order.slorlist2.view.SlorList2Layout',
		'module.sale.order.slorlist2.view.SlorList2ListerMaster1',
		'module.sale.order.slorlist2.view.SlorList2ListerMaster2',
		'module.sale.order.slorlist2.view.SlorList2ListerMaster3',
		'module.sale.order.slorlist2.view.SlorList2ListerMaster4',
		'module.sale.order.slorlist2.view.SlorList2ListerMaster5',
		'module.sale.order.slorlist2.view.SlorList2ListerMaster6',
		'module.sale.order.slorlist2.view.SlorList2ListerDetail',
		'module.sale.order.slorlist2.view.SlorList2Search'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-slorlist2-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			'module-slorlist2-layout #mainpanel'							: { tabchange : me.selectAction },
			// lister1 event
			'module-slorlist2-lister-master1 button[action=exportAction]'	: { click : me.exportAction1 },	// 엑셀
			// lister2 event
			'module-slorlist2-lister-master2 button[action=exportAction]'	: { click : me.exportAction2 },	// 엑셀
			// lister3 event
			'module-slorlist2-lister-master3 button[action=exportAction]'	: { click : me.exportAction3 },	// 엑셀
			// lister4 event
			'module-slorlist2-lister-master4 button[action=exportAction]'	: { click : me.exportAction4 },	// 엑셀
			'module-slorlist2-lister-master5 button[action=exportAction]'	: { click : me.exportAction5 },	// 엑셀
			'module-slorlist2-lister-master5 button[action=previewAction]'	: { click : me.previewAction },// 납기일별 미리보기 후 출력

			'module-slorlist2-layout #mainpanel'							: { tabchange : me.selectAction },

			'module-slorlist2-lister-master1' : {
				itemdblclick : me.selectDetail1 ,
				selectionchange : me.attachRecord
			},
			'module-slorlist2-lister-master2' : {
				itemdblclick : me.selectDetail2 ,
				selectionchange : me.attachRecord
			},
			'module-slorlist2-lister-master3' : {
				itemdblclick : me.selectDetail3 ,
				selectionchange : me.attachRecord
			},

			//detail event
			'module-slorlist2-lister-detail button[action=exportAction]'    : { click : me.exportAction7 },	// 엑셀

			'module-slorlist2-layout #subpanel'							    : { tabchange : me.selectAction2 },	// 삼정 - 수두별탭
			'module-slorlist2-lister-master6 button[action=exportAction]'   : { click : me.exportAction6 },		// 엑셀

			'module-slorlist2-lister-master5 button[action=printAction]'	: { click : me.printAction        }, /* 인수증발행 */
			'module-slorlist2-lister-master5 button[action=printAction2]'	: { click : me.printAction2       }, /* 거래명세서발행 */
			'module-slorlist2-lister-master5 button[action=printAction3]'	: { click : me.printAction3       }, /* 거래명세서발행 */

			'module-slorlist2-lister-master6 button[action=printAction]'	: { click : me.printAction        }, /* 인수증발행 */
			'module-slorlist2-lister-master6 button[action=printAction2]'	: { click : me.printAction2       }, /* 거래명세서발행 */
			'module-slorlist2-lister-master6 button[action=printAction3]'	: { click : me.printAction3       }, /* 거래명세서발행 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-slorlist2-layout') [0] },
		search		: function () { return Ext.ComponentQuery.query('module-slorlist2-search') [0] },
		master1		: function () { return Ext.ComponentQuery.query('module-slorlist2-lister-master1')[0] },
		master2		: function () { return Ext.ComponentQuery.query('module-slorlist2-lister-master2')[0] },
		master3		: function () { return Ext.ComponentQuery.query('module-slorlist2-lister-master3')[0] },
		master4		: function () { return Ext.ComponentQuery.query('module-slorlist2-lister-master4')[0] },
		master5		: function () { return Ext.ComponentQuery.query('module-slorlist2-lister-master5')[0] },
		master6		: function () { return Ext.ComponentQuery.query('module-slorlist2-lister-master6')[0] },
		detail		: function () { return Ext.ComponentQuery.query('module-slorlist2-lister-detail')[0] }
	},

	//조회

	selectAction:function() {
		var me = this,
			master1 = me.pocket.master1(),
			master2 = me.pocket.master2(),
			master3 = me.pocket.master3(),
			master4 = me.pocket.master4(),
			master5 = me.pocket.master5(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;

		if(param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
		}else{

			if ( tindex == 0 ) {
				lister = master4;
			}else if(tindex == 1){
				lister = master1;
			}else if(tindex == 2){
				lister = master2;
			}else if(tindex == 3){
				lister = master3;
			}else if(tindex == 4){
				lister = master5;
			}else if(tindex == 5){
				me.selectAction2();
			}

			if(tindex != 5) {
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();
				lister.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id, mes_system_type:_global.options.mes_system_type}) );
			}
		}
	},

	//삼정 - 수주별 현황
	selectAction2:function() {
		var me = this,
			master6 = me.pocket.master6(),
			lister  = master6,
			tpanel  = me.pocket.layout().down('#subpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.search(),
			param = search.getValues()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id, acpt_dvcd : (tindex == 0) ? '1000' : '2000', mes_system_type:_global.options.mes_system_type}));
	},



	attachRecord:function( smodel, record ){
		var me	= this,
		//master1= smodel ? smodel.view.ownerCt : me.pocket.master1(),
		//master2= smodel ? smodel.view.ownerCt : me.pocket.master2(),
		//master3= smodel ? smodel.view.ownerCt : me.pocket.master3(),
		//record= record ? record[0] : master1.getSelectionModel().getSelection()[0],
		//record= record ? record[0] : master2.getSelectionModel().getSelection()[0],
		record= record ? record[0] : master3.getSelectionModel().getSelection()[0]
		;
		me.pocket.detail().eraser() ;
		if (record) {
		}
	},

	//선택
	selectDetail1 : function(grid, record) {
		var me = this,
			detail = me.pocket.detail(),
			search = me.pocket.search(),
			param = search.getValues(),
			invc1_date,invc2_date, cstm_idcd, item_idcd, drtr_idcd
		;

		if(param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
			return;
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
			return;
		}else{
			invc1_date = param.invc1_date;
			invc2_date = param.invc2_date;
			cstm_idcd  = param.cstm_idcd;
			item_idcd  = param.item_idcd;
			drtr_idcd  = param.drtr_idcd;


			if (record) {
				var deli_date = record.get('deli_date') ? record.get('deli_date').replace(/-/g,"") : '';
				var invc_date = record.get('invc_date') ? record.get('invc_date').replace(/-/g,"") : '';

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
				mask.show();
				detail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { stor_id : _global.stor_id, deli_date : deli_date, invc_date : invc_date, cstm_idcd : cstm_idcd, item_idcd : item_idcd, drtr_idcd : drtr_idcd, mes_system_type:_global.options.mes_system_type });
			}
		}
	},

	selectDetail2 : function(grid, record) {
		var me = this,
			detail = me.pocket.detail(),
			search = me.pocket.search(),
			param = search.getValues(),
			invc1_date,invc2_date,item_idcd,drtr_idcd
		;
		if(param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
			return;
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
			return;
		}else{
			invc1_date = param.invc1_date;
			invc2_date = param.invc2_date;
			item_idcd = param.item_idcd;
			drtr_idcd = param.drtr_idcd;
			if (record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
				mask.show();
				detail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { stor_id : _global.stor_id, deli_date : record.get('deli_date'), cstm_idcd : record.get('cstm_idcd'), invc1_date : invc1_date,invc2_date : invc2_date, item_idcd : item_idcd, drtr_idcd : drtr_idcd, mes_system_type:_global.options.mes_system_type});
			}
		}
	},

	selectDetail3 : function(grid, record) {
		var me = this,
			detail = me.pocket.detail(),
			search = me.pocket.search(),
			param = search.getValues(),
			invc1_date,invc2_date,cstm_idcd,drtr_idcd
		;

		if(param.invc1_date==''||param.invc2_date==''){
			Ext.Msg.alert("알림", "조회기간을 선택해주십시오.");
			return;
		}else if(param.invc1_date > param.invc2_date){
			Ext.Msg.alert("알림", "조회기간을 다시 선택해주십시오.");
			return;
		}else{
			invc1_date = param.invc1_date;
			invc2_date = param.invc2_date;
			cstm_idcd = param.cstm_idcd;
			drtr_idcd = param.drtr_idcd;
			if (record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
				mask.show();
				detail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { stor_id : _global.stor_id, deli_date : record.get('deli_date'), item_idcd : record.get('item_idcd'), invc1_date : invc1_date,invc2_date : invc2_date, cstm_idcd : cstm_idcd ,drtr_idcd : drtr_idcd, mes_system_type:_global.options.mes_system_type});
			}
		}
	},


	/**
	 * 확인 버튼 이벤트
	 */
	previewAction: function(){
		var me = this,
			search	= me.pocket.search(),
			param   = search.getValues(),
			jrf	    = 'sjflv_slorlist2_list.jrf',
			resId   = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var arg = 'invc1_date~'+param.invc1_date+'~invc2_date~'+param.invc2_date+'~cstm_idcd~'+param.cstm_idcd+'~drtr_idcd~'+param.drtr_idcd+'~item_idcd~'+param.item_idcd;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	//인수증 발행
	printAction:function() {
		var me = this,
			master = me.pocket.master5(),
			master2 = me.pocket.master6(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			jrf = 'sjung_receipt_saleorder.jrf',
			jrf2 = 'sjung_receipt_saleorder2.jrf',
			resId =_global.hq_id.toUpperCase(),
			records = undefined
		;

		if(tindex == 4){
			records = master.getSelectionModel().getSelection();
		}else if(tindex == 5){
			records = master2.getSelectionModel().getSelection();
		}

		var err_msg = "";
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "수주현황 목록중 1건이상을 선택하여주십시오.");
			return;
		}

		if(resId == 'N1000SJUNG'){
			jrf = 'sjung_receipt_saleorder.jrf';
		}else{
			jrf = 'sjflv_receipt_saleorder.jrf';
		}

		var a = "";
		for(var i =0; i< records.length ; i++){
			if(i==0){
				a+= "[";
			}
				a+= '{\'invc_numb\':\''+records[i].get('invc_numb')+'\',\'line_seqn\':\''+records[i].get('line_seqn')+'\'}';
			if(i != records.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var url2 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win	;

		if(resId == 'N1000SJUNG'){
			Ext.Msg.confirm("확인", "인수증에 비고란 추가하겠습니까?", function(button) {
				if (button == 'yes') {
					url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800');
					win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
				} else if(button == 'no') {
					url2 :  window.open(_global.location.http()+encodeURI(url2),'test','width=1400,height=800');
					win	=  window.open(_global.location.http()+encodeURI(url2),'test','width=1000,height=900')
				}
			});
		}else{
			win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		}
		return win;
	},

	// 거래명세서 발행
	printAction2:function() {
		var me = this,
			master = me.pocket.master5(),
			master2 = me.pocket.master6(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			jrf = 'Invoice_Sjung_acpt.jrf',
			jrf2 = 'Invoice_Sjung_acpt2.jrf',
			jrf3 = 'Invoice_sjflv_acpt.jrf',
			jrfOem = 'Invoice_sjung_acpt_OEM.jrf',
			jrfOem2 = 'Invoice_sjung_acpt2_OEM.jrf',
			resId =_global.hq_id.toUpperCase(),
			records = undefined
		;

		var err_msg = "";

		if(tindex == 4){
			records = master.getSelectionModel().getSelection();
		}else if(tindex == 5){
			records = master2.getSelectionModel().getSelection();
		}

		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "수주현황 목록중 1건이상을 선택하여주십시오.");
			return ;
		}

		if (records) {
			var invc_numb = records[0].get('invc_numb');
			var line_seqn = records[0].get('line_seqn');
			var arg =	'invc_numb.'+invc_numb+'.'+'line_seqn.'+line_seqn+'.' ;

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var url2 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var url3 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrfOem+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var url4 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrfOem2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

			if(resId == 'N1000SJUNG'){
				Ext.Msg.confirm("확인", "거래명세서에 비고란 추가하겠습니까?", function(button) {
					if (button == 'yes') {
						if( records[0].get('acpt_dvcd') == '2000'){
							Ext.Ajax.request({
								url	:  window.open(_global.location.http()+encodeURI(url4),'test','width=1400,height=800'),
							});
						}else{
							Ext.Ajax.request({
								url2	:  window.open(_global.location.http()+encodeURI(url2),'test','width=1400,height=800'),
							});
						}
					} else if(button == 'no') {
						if( records[0].get('acpt_dvcd') == '2000'){
							Ext.Ajax.request({
								url	:  window.open(_global.location.http()+encodeURI(url3),'test','width=1400,height=800'),
							});
						}else{
							Ext.Ajax.request({
								url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
							});
						}
					}
				});
			}
		}

		var a = "";
		for(var i =0; i< records.length ; i++){
			if(i==0){
				a+= "[";
			}
				a+= '{\'invc_numb\':\''+records[i].get('invc_numb')+'\',\'line_seqn\':\''+records[i].get('line_seqn')+'\'}';
			if(i != records.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}

		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var url2 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var url3 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrfOem+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var url4 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrfOem2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

		if(resId == 'N1000SJFLV'){
			resource.loadPopup({
				widget : 'module-saleorder-print-popup',
			});
//				var a = "";
//				for(var i =0; i< record.length ; i++){
//					if(i==0){
//						a+= "[";
//					}
//						a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':\''+record[i].get('line_seqn')+'\'}';
//					if(i != record.length -1){
//						a+=",";
//					}else{
//						a+="]";
//					}
//				}
//				var url3 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf3+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
//				Ext.Ajax.request({
//					url3	:  window.open(_global.location.http()+encodeURI(url3),'test','width=1400,height=800'),
//				});
		}
	},

	printAction3:function() {
		var me = this,
			master = me.pocket.master5(),
			master2 = me.pocket.master6(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			jrf = 'Invoice_Sjung_acpt3.jrf',
			jrf2 = 'Invoice_Sjung_acpt4.jrf',
			resId =_global.hq_id.toUpperCase(),
			records = undefined
		;

		if(tindex == 4){
			records = master.getSelectionModel().getSelection();
		}else if(tindex == 5){
			records = master2.getSelectionModel().getSelection();
		}

		var err_msg = "";

		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "수주현황 목록중 1건이상을 선택하여주십시오.");
			return ;
		}

		if (records) {
			var invc_numb = records[0].get('invc_numb');
			var line_seqn = records[0].get('line_seqn');
			var arg =	'invc_numb.'+invc_numb+'.'+'line_seqn.'+line_seqn+'.' ;

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			var url2 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

			if(resId == 'N1000SJUNG'){
				Ext.Msg.confirm("확인", "거래명세서에 비고란 추가하겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.Ajax.request({
							url2	:  window.open(_global.location.http()+encodeURI(url2),'test','width=1400,height=800'),
						});
					} else if(button == 'no') {
						Ext.Ajax.request({
							url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
						});
					}
				});
			}
		}
		var a = "";
		for(var i =0; i< records.length ; i++){
			if(i==0){
				a+= "[";
			}
				a+= '{\'invc_numb\':\''+records[i].get('invc_numb')+'\',\'line_seqn\':\''+records[i].get('line_seqn')+'\'}';
			if(i != records.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}

		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var url2 = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf2+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function() {
		this.pocket.master2().writer({enableLoadMask:true});
	},
	exportAction3 : function() {
		this.pocket.master3().writer({enableLoadMask:true});
	},
	exportAction4 : function() {
		this.pocket.master4().writer({enableLoadMask:true});
	},
	exportAction5 : function() {
		this.pocket.master5().writer({enableLoadMask:true});
	},
	exportAction6 : function() {
		this.pocket.master6().writer({enableLoadMask:true});
	},
	exportAction7 : function() {
		this.pocket.detail().writer({enableLoadMask:true});
	}

});