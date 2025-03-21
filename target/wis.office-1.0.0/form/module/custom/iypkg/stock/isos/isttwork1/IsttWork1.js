Ext.define('module.custom.iypkg.stock.isos.isttwork1.IsttWork1', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.CstmClassPopup',
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.IypkgOrdrStatInfo'
	],
	models	: [
		'module.custom.iypkg.stock.isos.isttwork1.model.IsttWork1Lister',
		'module.custom.iypkg.stock.isos.isttwork1.model.IsttWork1Lister2',
		'module.custom.iypkg.stock.isos.isttwork1.model.IsttWork1WorkerLister',
	],
	stores	: [
		'module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1Lister',
		'module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1Lister2',
		'module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1WorkerLister',
		'module.custom.iypkg.stock.isos.isttwork1.store.IsttWork1ListerPopup',
	],
	views	: [
		'module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1Layout',
		'module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1Search',
		'module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1Lister',
		'module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1Lister2',
		'module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1WorkerEditor',
		'module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1WorkerLister',
		'module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1WorkerSearch',
		'module.custom.iypkg.stock.isos.isttwork1.view.IsttWork1ListerPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-isttwork1-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-isttwork1-layout button[action=selectAction]'			: { click : me.selectAction },
			'module-isttwork1-worker-editor button[action=selectAction2]'	: { click : me.selectAction2},	//조회2

			'module-isttwork1-lister button[action=exportAction]'			: { click : me.exportAction },
			'module-isttwork1-lister button[action=deleteAction]'			: { click : me.deleteAction },
			'module-isttwork1-lister button[action=printAction]'			: { click : me.printAction },
			'module-isttwork1-lister button[action=updateAction]'			: { click : me.updateAction2},	// 리스트 저장

			'module-isttwork1-worker-lister button[action=chkAction]'		: { click : me.chkAction	},	// 전체선택
			'module-isttwork1-worker-lister button[action=updateAction]'	: { click : me.updateAction },
			'module-isttwork1-worker-lister button[action=cancelAction]'	: { click : me.cancelAction },
			'module-isttwork1-lister'	: {
				itemdblclick	: me.selectRecord
			},
			'module-isttwork1-worker-lister'	: {
				itemdblclick	: me.selectRecord2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-isttwork1-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-isttwork1-search')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-isttwork1-lister')[0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-isttwork1-lister2')[0] },
//		popup	: function () { return Ext.ComponentQuery.query('module-isttwork1-lister-lookup-popup')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-isttwork1-worker-editor')[0] },
			search : function () { return Ext.ComponentQuery.query('module-isttwork1-worker-search')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-isttwork1-worker-lister')[0] }
		},
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister1 = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			editor = me.pocket.worker.editor(),
			param2 = editor.getValues(),
			param  = search.getValues(),
			lister = undefined, type,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search2 = me.pocket.worker.search()
			;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		if(tindex == 1){
			me.pocket.search().down('[name=collapsed]').expand();
			mask.show();
			lister1.select({
				callback:function(records, operation, success) {
					if (success) {
						lister1.getSelectionModel().select();
					} else {}
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id, type : '입고', invc_numb		: param2.invc_numb

				}) );
		}else if(tindex==0){
			me.pocket.search().down('[name=collapsed]').collapse();
		}
		mask.hide();
		search2.getForm().reset();

	},

	//worker-lister 조회
	selectAction2 : function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			editor = me.pocket.worker.editor(),
			search = me.pocket.worker.search(),
			param = editor.getValues(),
			item = lister.columnItem(),
			record = undefined
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					mask.hide();

				} else {
				}
			}, scope:me
		}, Ext.merge({
			invc_date1		: param.invc_date1,
			invc_date2		: param.invc_date2,
			cstm_idcd		: param.cstm_idcd,
			cstm_idcd2		: param.cstm_idcd2,
			invc_numb		: param.invc_numb
		}));

	},

	//입고리스트 팝업
	selectRecord : function(){
		var me = this,
			lister = me.pocket.lister(),
			selectRecord = lister.getSelectionModel().getSelection()
		;
		resource.loadPopup({
			widget	: 'lookup-iypkg-ordr-stat-popup',
			params:{
				records : selectRecord[0]['data']
			},
		})
	},

	//입고리스트 팝업
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
			param  = search.getValues(),
			new_invc_numb, new_line_seqn,
			tpanel = me.pocket.layout().down('#mainpanel'),
			chk, chk2
		;
		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[i].data.istt_qntt2 == 0){
				chk = 1;
				break;
			}
		}
		if(chk == 1){
			Ext.Msg.alert("알림","수량을 1개 이상 입력해주십시오.");
			return;
		}
		if(changes != 0){

			var x = 1;	//순번
			var arr = new Array();
			Ext.each(lister.getStore().getUpdatedRecords(),function(record){
				var length = Array.isArray(arr)?arr.findIndex(x => x.cstm_idcd == record.get('cstm_idcd')) : -1;
				if(length == -1){
					Ext.Ajax.request({
						url			: _global.location.http() + '/listener/seq/maxid.do',
						params		: {
							token	: _global.token_id ,
							param	: JSON.stringify({
								stor_id	: _global.stor_id,
								table_nm: 'purc_istt_mast'
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
					record.set('istt_date',param.invc_date);
					record.set('offr_path_dvcd',1);
				}else{
					var af_seqn = arr[length].line_seqn+1;
					arr[length].line_seqn = af_seqn;
					record.set('new_line_seqn',af_seqn);
					record.set('new_invc_numb',arr[length].new_invc_numb);
					record.set('istt_date',param.invc_date);
					record.set('offr_path_dvcd',1);
				}
			});
			var rec = lister.getStore().getUpdatedRecords();
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			lister.getStore().sync({
				success : function(operation){
					tpanel.items.indexOf(tpanel.setActiveTab(0));
					lister.getStore().reload();
					search.getForm().reset(true);
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
					me.pocket.lister().getStore().reload();
					Ext.Msg.confirm('', 'LOT표를 발행하시겠습니까?', function(value){
						if(value === 'yes') {
							me.printAction('update',rec) //TODO
						}
					});
				}
			});
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	//입고리스트 저장
	updateAction2:function() {
		var me = this,
			lister = me.pocket.lister(),
			store  = lister.getStore();

		var records = lister.getSelectionModel().getSelection();

		Ext.Msg.confirm("확인", "수정하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.UPDATE.mask });

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
			}
		});
	},


	//취소
	cancelAction:function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.worker.search(),
			select = lister.getStore().getUpdatedRecords().length
		;
		if(select){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.getStore().reload({
				callback: function(operation){
					mask.hide();
				}
			});
			search.getForm().reset(true);
		}
	},

	chkAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.worker.lister(),
			changes = lister.getStore().getUpdatedRecords().length
		;

		for(var i=0;i<changes;i++) {
			lister.getStore().getUpdatedRecords()[i].data.chk = false;
		}

	},

	deleteAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			workerlister = me.pocket.worker.lister(),
			store  = lister.getStore()
		;
		var records = lister.getSelectionModel().getSelection();

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();
				var a =[];

				for(var i =0; i< records.length ; i++){
					a.push({invc_numb : records[i].get('invc_numb'),line_seqn : records[i].get('line_seqn')});
				}
				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/stock/isos/isttwork1/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
					 	param	: JSON.stringify({
							stor_id		: _global.stor_id,
							hqof_idcd	: _global.hqof_idcd,
							records		: a
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							store.remove(records[0]);
							store.commitChanges();
						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						workerlister.getStore().load();
						mask.hide();
						store.reload();
					}
				});
			}
		});
	},
	// LOT표 발행
	printAction:function(cont,arr) {
			var me = this,
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection(),
			jrf		= 'Iypkg_LotTable.jrf',
			resId	= _global.hq_id.toUpperCase(),
			param	= '',err_msg='',
			chk = false,
			_param
		;
		if(arr.data){
			select = arr;
			chk = true;
		}
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("acpt_invc_numb") == "") {
					var name = record.get('fabc_name');
					if(name==''){
						name = '합계'
					}
					err_msg = '<span style="color:red !important">'+name+"</span>는 발행할 수 없습니다.";
					return;
				}
			});
		}

		if(resId == 'N1000LIEBE'){
			var a = "",
			jrf = 'Liebe_LotPrint.jrf',
			resId	= _global.hq_id.toUpperCase()
			;

			for(var i =0; i< select.length ; i++){
				if(i==0){
					a += "[";
				}
					a+= '{\'invc_numb\':\''+(chk?select[i].get('new_invc_numb'):select[i].get('invc_numb'))+'\'}';
				if(i != select.length -1){
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
		}

		if(resId == 'N1000DAE-A'){
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection(),
			jrf		= 'dae-a_LotTable.jrf',
			resId	= _global.hq_id.toUpperCase(), cstm = [], date = [], n = 0
			param	= '',err_msg='',
			chk = false
			;
			var err_msg = "";
			var records = lister.getSelectionModel().getSelection();
			var a = "";

			if (!records) {
				Ext.Msg.alert("알림", "목록을 선택해주십시오.");
				return;
			}else{
				for (var i = 0; i < records.length; i++) {
					cstm.push(records[i].data.cstm_idcd);
					date.push(records[i].data.invc_date);
				}
				for (var j = 1; j < records.length; j++) {
					if(date[0] == date[j]){
						n = 1;
					}
				}
				if (n == 0 && records.length > 1){
					Ext.Msg.alert("알림", "같은 발주일자 목록을 선택해주십시오.");
					return;
				}
				if(records.length > 0){
					for(var i =0; i< records.length ; i++){
						if(i==0){
							a += "[";
						}
						a+= '{\'invc_numb\':\''+(chk?records[i].get('new_invc_numb'):records[i].get('invc_numb'))+'\',\'line_seqn\':\''+(chk?records[i].get('new_line_seqn'):records[i].get('line_seqn'))+'\'}';
						if(i != records.length -1){
							a+=",";
						}else{
							a+="]";
						}
					}
				}
			}

			if(cont =='update'){

				if(arr != "" && arr != undefined){
					select = arr;
					chk = true;
				}

				var a = "";
				for(var i =0; i< select.length ; i++){
					if(i==0){
						a += "[";
					}
						a+= '{\'invc_numb\':\''+(chk?select[i].get('new_invc_numb'):select[i].get('invc_numb'))+'\',\'line_seqn\':'+ (chk?select[i].get('new_line_seqn'):select[i].get('line_seqn'))+'}';
					if(i != select.length -1){
						a+=",";
					}else{
						a+="]";
					}
				}
				_param = 'param~{\'records\':'+a+'}~';
			}else{
				_param = 'param~{\'records\':'+a+'}~';
			}
		}else{
			if(cont =='update'){
				if(arr != "" && arr != undefined){
					select = arr;
					chk = true;
				}
			}
			var a = "";
			for(var i =0; i< select.length ; i++){
				if(i==0){
					a += "[";
				}
					a+= '{\'invc_numb\':\''+(chk?select[i].get('new_invc_numb'):select[i].get('invc_numb'))+'\',\'line_seqn\':'+ (chk?select[i].get('new_line_seqn'):select[i].get('line_seqn'))+'}';
				if(i != select.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			_param = 'param~{\'records\':'+a+'}~';
		}
		if(err_msg!=''){
			Ext.Msg.alert('알림',err_msg);
			return;
		}
		console.log(_param);
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;
	},


	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	}

});

