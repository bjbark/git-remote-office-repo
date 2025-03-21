Ext.define('module.custom.iypkg.stock.isos.saleostt.SaleOstt', {  extend   : 'Axt.app.Controller',
requires : [
	'lookup.popup.view.BasePopup',
	'lookup.popup.view.UserPopup',
	'lookup.popup.view.CarPopup',
	'lookup.popup.view.BzplPopup',
	'lookup.popup.view.CstmPopup',
	'lookup.popup.view.ItemPopupV3',
	'lookup.popup.view.ProdPopup',
	'lookup.popup.view.IypkgOrdrPopup',
	'lookup.popup.view.CstmClassPopup',
	'Axt.popup.view.ZipcodeSearch',
	'lookup.upload.BoardUpload',
	'lookup.popup.view.IypkgOrdrStatInfo'
],
models	: [
		'module.custom.iypkg.stock.isos.saleostt.model.SaleOsttLister',
		'module.custom.iypkg.stock.isos.saleostt.model.SaleOsttWorkerLister'
	],
	stores	: [
		'module.custom.iypkg.stock.isos.saleostt.store.SaleOsttLister',
		'module.custom.iypkg.stock.isos.saleostt.store.SaleOsttWorkerLister'
	],
	views	: [
		'module.custom.iypkg.stock.isos.saleostt.view.SaleOsttLayout',
		'module.custom.iypkg.stock.isos.saleostt.view.SaleOsttLister',
		'module.custom.iypkg.stock.isos.saleostt.view.SaleOsttSearch',
		'module.custom.iypkg.stock.isos.saleostt.view.SaleOsttWorkerSearch',
		'module.custom.iypkg.stock.isos.saleostt.view.SaleOsttPrintPopup',
		'module.custom.iypkg.stock.isos.saleostt.view.SaleOsttPrintPopup2',
		'module.custom.iypkg.stock.isos.saleostt.view.SaleOsttAddPopup',
		'module.custom.iypkg.stock.isos.saleostt.view.SaleOsttWorkerLister',
		'module.custom.iypkg.stock.isos.saleostt.view.SaleOsttWorkerEditor'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-saleostt-layout #mainpanel'								: { tabchange : me.mainTabChange },
			'module-saleostt-layout button[action=selectAction]'			: { click : me.selectAction },
			'module-saleostt-worker-editor button[action=selectAction2]'	: { click : me.selectAction2 },	//조회2

			'module-saleostt-lister button[action=printAction]'				: { click : me.printAction },
			'module-saleostt-lister button[action=deleteAction]'			: { click : me.deleteAction },
			'module-saleostt-lister button[action=updateAction]'			: { click : me.updateAction2 },
			'module-saleostt-lister button[action=cancelAction]'			: { click : me.cancelAction2 },

			'module-saleostt-worker-lister button[action=printAction]'		: { click : me.printAction2 },
			'module-saleostt-worker-lister button[action=updateAction]'		: { click : me.updateAction },
			'module-saleostt-worker-lister button[action=cancelAction]'		: { click : me.cancelAction },
			'module-saleostt-worker-lister button[action=insertAction]'		: { click : me.insertAction },

			'module-saleostt-lister'	: {
				itemdblclick	: me.selectRecord
			},

			'module-saleostt-worker-lister'	: {
				itemdblclick	: me.selectRecord2
			},

		});
		me.callParent(arguments);
	},

	pocket  : {
		layout	: function () { return Ext.ComponentQuery.query('module-saleostt-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-saleostt-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-saleostt-lister')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-saleostt-worker-editor')[0] },
			search : function () { return Ext.ComponentQuery.query('module-saleostt-worker-search')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-saleostt-worker-lister')[0] }
		},
	},

	mainTabChange : function (tabPanel, newCard, oldCard ){
		var me     = this,
			lister = me.pocket.lister(),
			index  = tabPanel.items.indexOf(newCard),
			gPage  = tabPanel.items.indexOf(newCard)
		;
		if (index > 0) {
			me.pocket.search().down('[name=detailSelect]').expand();
			me.selectAction();
			lister.selectedRecords = new Set();
		}else{
			me.pocket.search().down('[name=detailSelect]').collapse();
			lister.selectedRecords = new Set();
		}
	},

	//조회.
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.worker.search()
		;
		 // selectedRecords를 초기화하는 부분
		if (lister.selectedRecords) {
			lister.selectedRecords = new Set();
		}

		if(tindex==1){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
//						lister.getSelectionModel().select(0);

						lister.down('[name = invc_qntt_edit]').setValue(0);
						lister.down('[name = ostt_qntt_edit]').setValue(0);
						lister.down('[name = sply_amnt_edit]').setValue(0);
						lister.down('[name = vatx_amnt_edit]').setValue(0);
						lister.down('[name = ttsm_amnt_edit]').setValue(0);

					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else{
			Ext.Msg.alert("알림","출고등록의 출고대기내역 가져오기로 조회하여 주십시오.");
		}
		search.getForm().reset(true);
	},

	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			editor = me.pocket.worker.editor(),
			search = me.pocket.worker.search(),
			param = editor.getValues(),
			record = undefined
		;
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.down('[name = invc_qntt_edit]').setValue(0);
					lister.down('[name = ostt_qntt_edit]').setValue(0);
					lister.down('[name = sply_amnt_edit]').setValue(0);
					lister.down('[name = vatx_amnt_edit]').setValue(0);
					lister.down('[name = ttsm_amnt_edit]').setValue(0);
				} else { }
			}, scope:me
		}, Ext.merge({
			cstm_idcd		: param.cstm_idcd,
			acpt_numb		: param.acpt_numb,
			deli_date1		: param.deli_date1,
			deli_date2		: param.deli_date2,
			invc_date1		: param.invc_date1,
			invc_date2		: param.invc_date2,
			prod_idcd		: param.prod_idcd
		}));
	},

	//출고리스트 팝업
	selectRecord : function(){
		var me = this,
			lister = me.pocket.lister(),
			selectRecord = lister.getSelectionModel().getSelection()
		;
		resource.loadPopup({
			widget	: 'lookup-iypkg-ordr-stat-popup',
			params:{
				records   : selectRecord[0]['data'],
			},
		})
	},

	//출고등록 팝업
	selectRecord2 : function(){
		var me = this,
			lister = me.pocket.worker.lister(),
			selectRecord = lister.getSelectionModel().getSelection()
		;
		resource.loadPopup({
			widget	: 'lookup-iypkg-ordr-stat-popup',
			params:{
				records : selectRecord[0]['data']
			},
		})
	},

	//저장
	updateAction:function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			store  = lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			search = me.pocket.worker.search(),
			editor = me.pocket.worker.editor(),
			param  = search.getValues(),
			new_invc_numb, new_line_seqn,
			tpanel = me.pocket.layout().down('#mainpanel'),
			chk
		;
		if(param.cstm_idcd == ''){
			Ext.Msg.alert("알림","거래처를 선택하여 주십시오.");
			return;
		}

		for (var i = 0; i < changes; i++) {
			var cstm_idcd = lister.getStore().getUpdatedRecords()[i].data.cstm_idcd;
			if(lister.getStore().getUpdatedRecords()[i].data.istt_qntt2 == 0){
				chk = 1;
				break;
			}
		}

		if(changes != 0 || store.getNewRecords().length != 0){
			if(chk == 1){
				Ext.Msg.alert("알림","수량을 1개 이상 입력해주십시오.");
				return;
			}
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
				}
			});
			var x = 1;	//순번
			//TODO 추가시 change에 안들어오는 것 같음 확인해서 처리해야함. 20220415

			var rec;

			if(changes == 0){
				for (var a = 0; a < store.getNewRecords().length; a++) {
					lister.getStore().getNewRecords()[a].data.new_line_seqn = x++;
					lister.getStore().getNewRecords()[a].data.new_invc_numb = new_invc_numb;
					lister.getStore().getNewRecords()[a].data.ostt_date = param.ostt_date;
					lister.getStore().getNewRecords()[a].data.cars_idcd = param.cars_idcd;
					lister.getStore().getNewRecords()[a].data.trnt_exps = param.trnt_exps;
					lister.getStore().getNewRecords()[a].data.nwek_name = param.nwek_name;
					lister.getStore().getNewRecords()[a].data.cstm_idcd = param.cstm_idcd;
					if(lister.getStore().getNewRecords()[a].data.ostt_qntt2 <= 0){
						lister.getStore().remove (lister.getStore().getNewRecords()[a]);
					}
				}
				rec = lister.getStore().getNewRecords();
			}else{
				for (var a = 0; a < changes; a++) {
					lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
					lister.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
					lister.getStore().getUpdatedRecords()[a].data.ostt_date = param.ostt_date;
					lister.getStore().getUpdatedRecords()[a].data.cars_idcd = param.cars_idcd;
					lister.getStore().getUpdatedRecords()[a].data.trnt_exps = param.trnt_exps;
					lister.getStore().getUpdatedRecords()[a].data.nwek_name = param.nwek_name;
					lister.getStore().getUpdatedRecords()[a].data.cstm_idcd = param.cstm_idcd;
					if(lister.getStore().getUpdatedRecords()[a].data.ostt_qntt2 <= 0){
						lister.getStore().remove (lister.getStore().getUpdatedRecords()[a]);
					}
				}
				rec = lister.getStore().getUpdatedRecords();
			}
//			var rec = lister.getStore().getUpdatedRecords();
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			lister.getStore().sync({
				success : function(operation){
//					tpanel.items.indexOf(tpanel.setActiveTab(0));
//					lister.getStore().reload();
					me.selectAction2();
					search.getForm().reset(true);
					editor.getForm().reset(true);
					lister.down('[name=ostt_qntt_edit]').reset();
					lister.down('[name=sply_amnt_edit]').reset();
					lister.down('[name=vatx_amnt_edit]').reset();
					lister.down('[name=ttsm_amnt_edit]').reset();

					Ext.Msg.confirm("확인", "거래명세서를 발행하시겠습니까?", function(button) {
						if (button == 'yes') {
							me.printAction2('update',cstm_idcd,rec);
						}
					});
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
//					store.reload();
//					me.pocket.lister().getStore().reload();
				}
			});
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}

	},
	updateAction2:function(){ // lister modify
		var	me		= this,
			lister	= me.pocket.lister(),
			store	= lister.getStore()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();

//		Ext.Msg.confirm("확인", "거래명세서를 발행하시겠습니까?", function(button) {
//			if (button == 'yes') {

		store.sync({
			success : function(operation){
			},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
				store.reload();
//			}
//		});
			}
		});
	},
	//취소
	cancelAction:function() {
		var me = this,
			lister = me.pocket.worker.lister()
		;
		lister.getStore().reload();
	},

	//취소
	cancelAction2:function() {
		var me = this,
			lister = me.pocket.lister()
		;
		lister.getStore().reload({
			callback: function(operation){
			}
		});
	},

	printAction : function(cont,cstm_idcd,arr){
		var me = this,
			lister = me.pocket.lister(),
//			select = lister.getSelectionModel().getSelection()
			select = Array.from(lister.selectedRecords)
		;
		for(var i=0;i <select.length;i++){
			if(select[0].get('cstm_idcd')!=select[i].get('cstm_idcd')){
				Ext.Msg.alert('알림','같은 납품거래처만 거래명세서발행이 가능합니다.')
				checked = 1
				return;
			}
		}

		for(var i=0;i <select.length;i++){
			if(select[0].get('assi_cstm_idcd')!=select[i].get('assi_cstm_idcd')){
				Ext.Msg.alert('알림','납품거래처의 매입처가 같아야 거래명세서발행이 가능합니다.')
				checked = 1
				return;
			}
		}

		if(select.length > 0 || arr.length > 0){
			resource.loadPopup({
				widget : 'module-iypkg-saleostt-print-popup',
				params : {
					arr : select,
				}
			});
		}
//		else{
//			Ext.Msg.alert("알림","출력할 출고내역 선택하여 주십시오.");
//			return;
//		}

	},

	printAction2 : function(cont,cstm_idcd,arr){
		var me = this,
			lister = me.pocket.worker.lister(),
			select = lister.getSelectionModel().getSelection()
		;
//		var records = lister.getSelectionModel().getSelection();

		for(var i=0;i <select.length;i++){
			if(select[0].get('cstm_idcd')!=select[i].get('cstm_idcd')){
				Ext.Msg.alert('알림','같은 납품거래처만 거래명세서발행이 가능합니다.')
				checked = 1
				return;
			}
		}

		for(var i=0;i <select.length;i++){
			if(select[0].get('assi_cstm_idcd')!=select[i].get('assi_cstm_idcd')){
				Ext.Msg.alert('알림','납품거래처의 매입처가 같아야 거래명세서발행이 가능합니다.')
				checked = 1
				return;
			}
		}

//		if(select.length > 0){
			resource.loadPopup({
				widget : 'module-iypkg-saleostt-print-popup2',
				params : {
					arr : arr,
				}
			});
//		}
//		else{
////			Ext.Msg.alert("알림","출력할 출고내역 선택하여 주십시오.");
////			return;
//		}

	},

	insertAction:function(){
		var me = this,
			lister = me.pocket.worker.lister(),
			store = lister.getStore(),
			new_invc_numb
		;
		resource.loadPopup({
			widget : 'module-iypkg-saleostt-add-popup',
		});

	},
	deleteAction:function(){
		var	me		= this,
			lister	= me.pocket.lister(),
			store	= lister.getStore(),
			selects	= lister.getSelectionModel().getSelection()
		;
		if(selects.length > 0 ){
			for (var i = 0; i < selects.length; i++) {
				store.remove(selects[i]);
			}
		}
		store.sync({
			callback:function(){
				store.reload();
			}
		})
	},
	exportAction : function(button){
		var value = button.button ;
		this.pocket.master().writer({enableLoadMask:true});
	},

	exportAction2 : function(button){
		var value = button.button ;
		this.pocket.detail().writer({enableLoadMask:true});
	}
});


