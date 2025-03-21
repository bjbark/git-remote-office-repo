Ext.define('module.custom.iypkg.stock.isos.saleostt2.SaleOstt2', {  extend   : 'Axt.app.Controller',
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
	'lookup.upload.BoardUpload'
],
models	: [
		'module.custom.iypkg.stock.isos.saleostt2.model.SaleOstt2Lister',
		'module.custom.iypkg.stock.isos.saleostt2.model.SaleOstt2WorkerLister',
	],
	stores	: [
		'module.custom.iypkg.stock.isos.saleostt2.store.SaleOstt2Lister',
		'module.custom.iypkg.stock.isos.saleostt2.store.SaleOstt2WorkerLister',
	],
	views	: [
		'module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2Layout',
		'module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2Lister',
		'module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2Search',
		'module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2WorkerSearch',
		'module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2PrintPopup',
		'module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2PrintPopup2',
		'module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2AddPopup',
		'module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2WorkerLister',
		'module.custom.iypkg.stock.isos.saleostt2.view.SaleOstt2WorkerEditor'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-saleostt2-layout #mainpanel'							: { tabchange : me.mainTabChange },
			'module-saleostt2-layout button[action=selectAction]'			: { click : me.selectAction },
			'module-saleostt2-worker-editor button[action=selectAction2]'	: { click : me.selectAction2 },	//조회2

			'module-saleostt2-lister button[action=printAction]'			: { click : me.printAction },
			'module-saleostt2-lister button[action=deleteAction]'			: { click : me.deleteAction },
			'module-saleostt2-lister button[action=updateAction]'			: { click : me.updateAction2 },
			'module-saleostt2-lister button[action=cancelAction]'			: { click : me.cancelAction2 },

			'module-saleostt2-worker-lister button[action=printAction]'		: { click : me.printAction2 },
			'module-saleostt2-worker-lister button[action=updateAction]'		: { click : me.updateAction },
			'module-saleostt2-worker-lister button[action=cancelAction]'		: { click : me.cancelAction },
			'module-saleostt2-worker-lister button[action=insertAction]'		: { click : me.insertAction },


		});
		me.callParent(arguments);
	},

	pocket  : {
		layout	: function () { return Ext.ComponentQuery.query('module-saleostt2-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-saleostt2-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-saleostt2-lister')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-saleostt2-worker-editor')[0] },
			search : function () { return Ext.ComponentQuery.query('module-saleostt2-worker-search')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-saleostt2-worker-lister')[0] }
		},
	},

	mainTabChange : function (tabPanel, newCard, oldCard ){
		var me    = this,
			index = tabPanel.items.indexOf(newCard),
			gPage = tabPanel.items.indexOf(newCard)
		;
		if (index > 0) {
			me.pocket.search().down('[name=detailSelect]').expand();
			me.selectAction();
		}else{
			me.pocket.search().down('[name=detailSelect]').collapse();
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
		if(tindex==1){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
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
		for (var i = 0; i < changes; i++) {
			var cstm_idcd = lister.getStore().getUpdatedRecords()[i].data.cstm_idcd;
			if(lister.getStore().getUpdatedRecords()[i].data.istt_qntt2 == 0){
				chk = 1;
				break;
			}
		}
		if(chk == 1){
			Ext.Msg.alert("알림","수량을 1개 이상 입력해주십시오.");
			return;
		}
//		Ext.Msg.confirm("확인", "거래명세서를 발행하시겠습니까?", function(button) {
//			if (button == 'yes') {
//				me.printAction('update',cstm_idcd,rec) //TODO
//			}
//		});
		if(changes != 0){

			var msg="";
			var x = 1;	//순번
			var arr = new Array();
			Ext.each(lister.getStore().getUpdatedRecords(),function(record){
				var length = Array.isArray(arr)?arr.findIndex(x => x.cstm_idcd == record.get('cstm_idcd') && x.dlvy_cstm_idcd == record.get('dlvy_cstm_idcd')) : -1; //에러처럼 보이지만 에러아님.

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
							arr.push({cstm_idcd:record.get('cstm_idcd'),dlvy_cstm_idcd : record.get('dlvy_cstm_idcd'),new_invc_numb : result.records[0].seq, line_seqn : 1})
						}
					});
					record.set('new_line_seqn',1);
					record.set('new_invc_numb',new_invc_numb);
					record.set('ostt_date',param.ostt_date);
					record.set('cars_idcd',param.cars_idcd);
					record.set('trnt_exps',param.trnt_exps);
					record.set('nwek_name',param.nwek_name);
				}else{
					var af_seqn = arr[length].line_seqn+1;
					arr[length].line_seqn = af_seqn;
					record.set('new_line_seqn',af_seqn);
					record.set('new_invc_numb',arr[length].new_invc_numb);
					record.set('ostt_date',param.ostt_date);
					record.set('cars_idcd',param.cars_idcd);
					record.set('trnt_exps',param.trnt_exps);
					record.set('nwek_name',param.nwek_name);
				}
			});
			if(msg!=""){
				Ext.Msg.alert('알림',msg);
				return;
			}
			var rec = lister.getStore().getUpdatedRecords();
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			lister.getStore().sync({
				success : function(operation){
					tpanel.items.indexOf(tpanel.setActiveTab(0));
					lister.getStore().reload();
					search.getForm().reset(true);
					editor.getForm().reset(true);

					lister.down('[name=ostt_qntt_edit]').reset();
					lister.down('[name=sply_amnt_edit]').reset();
					lister.down('[name=vatx_amnt_edit]').reset();
					lister.down('[name=ttsm_amnt_edit]').reset();

					Ext.Msg.confirm("확인", "거래명세서를 발행하시겠습니까?", function(button) {
						if (button == 'yes') {
							me.printAction('update',cstm_idcd,rec);
//							me.printAction2('update',new_invc_numb,rec);
						}
					});
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
					me.pocket.lister().getStore().reload();
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

		store.sync({
			success : function(operation){
			},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
				store.reload();
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
			select = lister.getSelectionModel().getSelection(),
			chk = "";
		;


		for(var i=0;i <select.length;i++){
			if(select[0].get('assi_cstm_idcd')!=select[i].get('assi_cstm_idcd')){
				Ext.Msg.alert('알림','납품거래처의 매입처가 같아야 거래명세서발행이 가능합니다.')
				checked = 1
				return;
			}
		}
		if(!arr){
			arr = [];
		}
		if(cont == "update"){
			chk = 1;
		}

		console.log(arr);
		if(select.length > 0 || chk == 1){
			resource.loadPopup({
				widget : 'module-iypkg-saleostt2-print-popup',
				params : {
					chk  : chk,
					rec  : arr
				}
			});
		}
//		else{
//			Ext.Msg.alert("알림","출력할 출고내역 선택하여 주십시오.");
//			return;
//		}

	},

	printAction2 : function(cont,new_invc_numb,max_seqn){
		var me = this,
			lister = me.pocket.worker.lister(),
			select = lister.getSelectionModel().getSelection(),
			lister2 = me.pocket.lister(),
			select2 = lister2.getSelectionModel().getSelection(),
			search = me.pocket.worker.search(),
			param  = search.getValues(),
			jrf = 'Invoice_dae-a.jrf'
			records = lister.getSelectionModel().getSelection();
		;
//		var records = lister.getSelectionModel().getSelection();

		for(var i=0;i <select.length;i++){
			if(select[0].get('assi_cstm_idcd')!=select[i].get('assi_cstm_idcd')){
				Ext.Msg.alert('알림','납품거래처의 매입처가 같아야 거래명세서발행이 가능합니다.')
				checked = 1
				return;
			}
		}

//		if(select.length > 0){
			resource.loadPopup({
				widget : 'module-iypkg-saleostt2-print-popup2',
				params :
				{
					new_invc_numb: new_invc_numb,
				},
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
			widget : 'module-iypkg-saleostt2-add-popup',
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


