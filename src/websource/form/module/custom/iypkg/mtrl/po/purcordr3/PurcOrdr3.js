Ext.define('module.custom.iypkg.mtrl.po.purcordr3.PurcOrdr3', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ProdPopup'
	],

	models:[
		'module.custom.iypkg.mtrl.po.purcordr3.model.PurcOrdr3Master',
		'module.custom.iypkg.mtrl.po.purcordr3.model.PurcOrdr3WorkerDetail',
		'module.custom.iypkg.mtrl.po.purcordr3.model.PurcOrdr3WorkerMaster',
	],
	stores:[
		'module.custom.iypkg.mtrl.po.purcordr3.store.PurcOrdr3Master',
		'module.custom.iypkg.mtrl.po.purcordr3.store.PurcOrdr3WorkerMaster',
		'module.custom.iypkg.mtrl.po.purcordr3.store.PurcOrdr3WorkerDetail',
	],
	views : [
		'module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3Layout',
		'module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3Search',
		'module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3Master',
		'module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3WorkerEditor',
		'module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3WorkerSearch',
		'module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3WorkerMaster',
		'module.custom.iypkg.mtrl.po.purcordr3.view.PurcOrdr3WorkerDetail',

	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({// TODO
			'module-purcordr3-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-purcordr3-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */
			'module-purcordr3-lister button[action=writeAction]'					: { click : me.PrintAction		}, /*발주서발행*/
			'module-purcordr3-lister button[action=deleteAction]'					: { click : me.deleteAction			}, /* 삭제 */
			'module-purcordr3-lister button[action=exportAction]'					: { click : me.exportAction			}, /* 엑셀 */

			'module-purcordr3-worker-editor button[action=selectAction2]'			: { click : me.selectAction2		}, /* 조회2*/
			'module-purcordr3-worker-master button[action=updateAction]'			: { click : me.updateAction			}, /* 저장 */
			'module-purcordr3-worker-master button[action=cancelAction]'			: { click : me.cancelAction			}, /* 취소 */

			'module-purcordr3-worker-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-purcordr3-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-purcordr3-search')[0] },
		master : function () { return Ext.ComponentQuery.query('module-purcordr3-lister')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-purcordr3-worker-editor')[0] },
			search : function () { return Ext.ComponentQuery.query('module-purcordr3-worker-search')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-purcordr3-worker-master')[0] },
			detail : function () { return Ext.ComponentQuery.query('module-purcordr3-worker-detail')[0] },
		}
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this
			lister = me.pocket.master(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(tindex==1){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));
		}
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

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					mask.hide();
				} else { }
			}, scope:me
		}, Ext.merge({	cstm_idcd		: param.cstm_idcd,
						prod_idcd		: param.prod_idcd,
						invc_date1		: param.invc_date1,
						invc_date2		: param.invc_date2
		}));

	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.worker.detail(),
			editor = me.pocket.worker.editor(),
			param = editor.getValues()
		;

		console.log(record);
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('acpt_numb')});
		}
	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.worker.detail()
		;

		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	//취소
	cancelAction:function() {
		var me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			search = me.pocket.worker.search(),
			lister = me.pocket.worker.lister(),
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
//		tpanel.items.indexOf(tpanel.setActiveTab(0));
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
			tpanel = me.pocket.layout().down('#mainpanel')
		;

		if(changes != 0){
			if (param.cstm_idcd==''){
				Ext.Msg.alert("알림","발주처를 반드시 입력해주십시오.");
				return;
			}else{
				Ext.Ajax.request({
					url			: _global.location.http() + '/custom/iypkg/mtrl/po/purcordr3/get/invc.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: '상품발주번호'
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
				for (var a = 0; a < changes; a++) {
					lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
					lister.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
					lister.getStore().getUpdatedRecords()[a].data.offr_date = param.offr_date;
					lister.getStore().getUpdatedRecords()[a].data.deli_date = param.deli_date;
					lister.getStore().getUpdatedRecords()[a].data.drtr_idcd = param.drtr_idcd;
					lister.getStore().getUpdatedRecords()[a].data.drtr_name = param.drtr_name;
					lister.getStore().getUpdatedRecords()[a].data.cstm_idcd = param.cstm_idcd;
					lister.getStore().getUpdatedRecords()[a].data.cstm_name = param.cstm_name;
					lister.getStore().getUpdatedRecords()[a].data.offr_path_dvcd = 3;				//발주구분코드 3 : 상품
				}

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
					}
				});

			}
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}
	},

	//삭제
	deleteAction:function() {
		var me = this,
			lister = me.pocket.master(),
			workerlister = me.pocket.worker.lister(),
			store  = lister.getStore()
		;
		var records = lister.getSelectionModel().getSelection();

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/mtrl/po/purcordr3/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							line_seqn	: records[0].get('line_seqn'),
							acpt_numb	: records[0].get('acpt_numb'),
							acpt_seqn	: records[0].get('acpt_seqn')
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
					}
				});
			}
		});
	},

	//발주서 발행
	PrintAction:function(cont,new_invc_numb,max_seqn) {
		var me = this,
			master = me.pocket.master(),
			select = master.getSelectionModel().getSelection(),
			jrf = 'PurcOrderReport_prod.jrf',
			resId = _global.hq_id.toUpperCase(), cstm = [], date = [], n = 0
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		var a = "";
		if(resId == 'N1000DAE-A'){
			var a = "",
			jrf = 'dae-a_PurcOrderReport_prod.jrf',
			resId	= _global.hq_id.toUpperCase()
			;

			for(var i =0; i< select.length ; i++){
				if(i==0){
					a += "[";
				}
				a+= '{\'invc_numb\':\''+records[i].get('invc_numb')+'\',\'line_seqn\':\''+records[i].get('line_seqn')+'\'}';
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
		if(cont!='update'){
			if (!records) {
				Ext.Msg.alert("알림", "목록을 선택해주십시오.");
				return;
			}else{
				for (var i = 0; i < records.length; i++) {
					cstm.push(records[i].data.cstm_idcd);
					date.push(records[i].data.invc_date);
				}
				for (var j = 1; j < records.length; j++) {
					if(date[0] != date[j]){
						n = 1;
					}
				}
				if (n == 1 && records.length > 1){
					Ext.Msg.alert("알림", "같은 발주일자 목록을 선택해주십시오.");
					return;
				}
				if(records.length > 0){
					for(var i =0; i< records.length ; i++){
						if(i==0){
							a += "[";
						}
						a+= '{\'invc_numb\':\''+records[i].get('invc_numb')+'\',\'line_seqn\':\''+records[i].get('line_seqn')+'\'}';
						if(i != records.length -1){
							a+=",";
						}else{
							a+="]";
						}
					}
				}
			}
		}else{
			for(var i =0; i< max_seqn ; i++){
				if(i==0){
					a += "[";
				}
				a+= '{\'invc_numb\':\''+new_invc_numb+'\',\'line_seqn\':\''+(i+1)+'\'}';
				if(i != max_seqn-1){
					a+=",";
				}else{
					a+="]";
				}
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')

	},

	//엑셀
	exportAction : function(self) {
		this.pocket.master().writer({enableLoadMask:true});
	},

});
