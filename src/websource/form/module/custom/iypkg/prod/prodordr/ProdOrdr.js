Ext.define('module.custom.iypkg.prod.prodordr.ProdOrdr', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.ItemPopupV3'
	],

	models:[
		'module.custom.iypkg.prod.prodordr.model.ProdOrdr',
		'module.custom.iypkg.prod.prodordr.model.ProdOrdrWkct',
		'module.custom.iypkg.prod.prodordr.model.ProdOrdrWrite',
	],
	stores:[
		'module.custom.iypkg.prod.prodordr.store.ProdOrdrDetail',
		'module.custom.iypkg.prod.prodordr.store.ProdOrdrDetail3',
		'module.custom.iypkg.prod.prodordr.store.ProdOrdrMaster',
		'module.custom.iypkg.prod.prodordr.store.ProdOrdrMaster2',
		'module.custom.iypkg.prod.prodordr.store.ProdOrdrWrite',
		'module.custom.iypkg.prod.prodordr.store.ProdOrdrWkctDetail1',
		'module.custom.iypkg.prod.prodordr.store.ProdOrdrWkctDetail2',
	],
	views : [
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrLayout',
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrSearch',
		/* 작업 */
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrDetail',
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrDetail3',
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrMaster',
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrMaster2',
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrWorkerEditor1',
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrWorkerEditor2',
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrWritePopup',
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrWkctDetail1',
		'module.custom.iypkg.prod.prodordr.view.ProdOrdrWkctDetail2',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-prodordr-layout #mainpanel'										: { tabchange : me.selectAction},
			'module-prodordr-layout button[action=selectAction]'					: { click : me.selectAction    }, /* 조회 */
			'module-prodordr-master button[action=exportAction]'					: { click : me.exportAction    }, /* 엑셀1 */
			'module-prodordr-wkctdetail1 button[action=exportAction]'				: { click : me.exportAction2   }, /* 엑셀2 */
			'module-prodordr-wkctdetail1 button[action=deleteAction]'				: { click : me.deleteAction    }, /* 엑셀1 */

			'module-prodordr-master2 button[action=writeAction]'					: { click : me.writeAction     }, /* 지시등록 */
			'module-prodordr-master2 button[action=allAction]'						: { click : me.allAction       }, /* 지시등록(일괄) */

			'module-prodordr-master'	: {
				selectionchange	: me.selectRecord,
			},
			'module-prodordr-master2'	: {
				selectionchange	: me.selectDetail
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-prodordr-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-prodordr-search')[0] },
		detail : function () { return Ext.ComponentQuery.query('module-prodordr-detail')[0] },
		detail3 : function () { return Ext.ComponentQuery.query('module-prodordr-detail3')[0] },
		master  : function () { return Ext.ComponentQuery.query('module-prodordr-master')[0] },
		master2 : function () { return Ext.ComponentQuery.query('module-prodordr-master2')[0] },
		write	: function () { return Ext.ComponentQuery.query('module-prodordr-write-popup')[0]},
		wkctdetail1   : function () { return Ext.ComponentQuery.query('module-prodordr-wkctdetail1')[0] },
		wkctdetail2   : function () { return Ext.ComponentQuery.query('module-prodordr-wkctdetail2')[0] },
		workereditor1 : function () { return Ext.ComponentQuery.query('module-prodordr-worker-editor1')[0] },
		workereditor2 : function () { return Ext.ComponentQuery.query('module-prodordr-worker-editor2')[0] }

	},

	selectAction:function(callbackFn) {
		var me = this,
			master	= me.pocket.master(),
			master2	= me.pocket.master2(),
			wkctdetail2	= me.pocket.wkctdetail2(),
			detail	= me.pocket.detail(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			tab
		;

		if(tindex==0){
			lister = master;
			search.down('[name=invc_date1]').setFieldLabel('지시일자');
		}else{
			lister = master2;
			search.down('[name=invc_date1]').setFieldLabel('계획일자');
		}

		wkctdetail2.getStore().clearData();
		wkctdetail2.getStore().loadData([],false);

		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		if(tindex==0){
			mask.show();
			master.select({
				callback:function(records, operation, success) {
					if (success) {
						master.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge(param, { stor_grp : _global.stor_grp }));
		}else if(tindex==1){
			mask.show();
			master2.select({
				callback:function(records, operation, success) {
					if (success) {
						master2.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge(param, { stor_grp : _global.stor_grp }));
		}
	},

	selectRecord:function( grid, record ){
		var me = this,
			detail = me.pocket.detail(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			workereditor1 = me.pocket.workereditor1(),
			wkctdetail1	= me.pocket.wkctdetail1()
		;
		if (record.length > 0) {
			workereditor1.loadRecord(record[0]);

			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, Ext.merge({stor_id : _global.stor_id, invc_numb : record[0].data.invc_numb}) );

			wkctdetail1.select({
				 callback : function(record, operation, success) {
					if (success) {
						wkctdetail1.getSelectionModel().select(0);
					} else {}
				}, scope : me
			}, Ext.merge(param,{ pror_numb : record[0].get('pror_numb') }) );
		}
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail  = me.pocket.detail(),
			detail3 = me.pocket.detail3(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			workereditor2	= me.pocket.workereditor2(),
			wkctdetail2		= me.pocket.wkctdetail2(),
			select	= me.pocket.master2().getSelectionModel().getSelection()[0]
		;
		if (record[0]) {
			detail.select({
				 callback : function(record, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { invc_numb : record[0].get('invc_numb') });

			wkctdetail2.select({
				 callback : function(record, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			},  Ext.merge(param,{ plan_numb : record[0].get('plan_numb') }) );

			detail3.loadRecord(record[0]);
			workereditor2.loadRecord(record[0]);
		}
	},

	//작업지시
	writeAction:function() {
		var me = this,
			master = me.pocket.master2(),
			select  = master.getSelectionModel().getSelection(),
			popup = Ext.ComponentQuery.query('module-prodordr-write-popup')[0]
		;
		if(select.length == 0){
			Ext.Msg.alert("알림","지시 할 항목을 선택해주십시오.");
		}else{
			resource.loadPopup({
				widget : 'module-prodordr-write-popup',
				params : {
				},
				result : function(records) {
					master.getStore().reload();
 				}
			})
		}
		return;
	},

	//삭제
	deleteAction:function() {
		var me = this,
			workereditor1 = me.pocket.workereditor1(),
			wkctdetail1 = me.pocket.wkctdetail1(),
			detail = me.pocket.detail(),
			master = me.pocket.master(),
			store  = wkctdetail1.getStore(),
			records = wkctdetail1.getSelectionModel().getSelection()
		;

		Ext.Msg.confirm("확인", "해당 입고 정보를 삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				for (var i = 0; i < records.length; i++) {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/prodordr/set/del_yn.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								invc_numb		: records[i].get('invc_numb'),
								line_seqn		: records[i].get('line_seqn')
							})
						},
						success : function(response, request) {
							var object = response,
							result = Ext.decode(object.responseText)
							;
							if (result.success) {
								store.remove(records[i]);
								store.commitChanges();
							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
						}
					});
				}

				mask.hide();
				store.reload();
				master.getStore().reload();

				workereditor1.getForm().reset();

				detail.getStore().clearData();
				detail.getStore().loadData([],false);

				master.getStore().reload();
			}
		});
	},

	allAction : function(){
		var me = this,
			master = me.pocket.master2(),
			select = master.getSelectionModel().getSelection(),
			length = select.length,
			a = []
		;
		console.log(select);

		if(length > 0){
			for (var i = 0; i < length; i++) {
				a.push({ invc_numb : select[i].data.plan_numb});
			}

			Ext.Msg.confirm("확인", "일괄등록 하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.UPDATE.mask });
					mask.show();

					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/prodordr/set/write2.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: JSON.stringify({
								records		: a,
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							if (result.success) {

							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							master.getStore().reload();
							mask.hide();
						}
					});

				}
			});
		}
	},

	exportAction : function(self) {
		this.pocket.master().writer({enableLoadMask:true});
	},

	exportAction2 : function(self) {
		this.pocket.wkctdetail1().writer({enableLoadMask:true});
	}
});
