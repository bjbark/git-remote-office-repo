Ext.define('module.custom.iypkg.prod.prodordr2.ProdOrdr2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ProdPopup',
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2WritePopup'
	],

	models:[
		'module.custom.iypkg.prod.prodordr2.model.ProdOrdr2Master1',
		'module.custom.iypkg.prod.prodordr2.model.ProdOrdr2Master2',
		'module.custom.iypkg.prod.prodordr2.model.ProdOrdr2Detail1',
		'module.custom.iypkg.prod.prodordr2.model.ProdOrdr2Detail2',
		'module.custom.iypkg.prod.prodordr2.model.ProdOrdr2DetailFabc',
	],
	stores:[
		'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Master1',
		'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Master2',
		'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Detail1',
		'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2Detail2',
		'module.custom.iypkg.prod.prodordr2.store.ProdOrdr2DetailFabc',
	],
	views : [
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Layout',
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Search',
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Master1',
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Master2',
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Detail1',
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2Detail2',
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2DetailFabc',
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2WorkerSearch',
		'module.custom.iypkg.prod.prodordr2.view.ProdOrdr2WorkerSearch2',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({// TODO
			'module-prodordr2-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-prodordr2-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */
			'module-prodordr2-detail2 button[action=updateAction]'					: { click : me.updateAction			}, /* 저장 */

			'module-prodordr2-master1 button[action=exportAction]'					: { click : me.exportAction			}, /* 엑셀 */
			'module-prodordr2-detail1 button[action=deleteAction]'					: { click : me.deleteAction			}, /* 엑셀 */
			'module-prodordr2-detail1 button[action=exportAction]'					: { click : me.exportAction2		}, /* 엑셀 */
			'module-prodordr2-master2 button[action=ordrAction]'					: { click : me.ordrAction			}, /* 외주지시등록 */

			'module-prodordr2-master1'	: {
				selectionchange	: me.selectDetail1
			},

			'module-prodordr2-master2'	: {
				selectionchange	: me.selectDetail2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-prodordr2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-prodordr2-search')[0] },
		master1 : function () { return Ext.ComponentQuery.query('module-prodordr2-master1')[0] },
		master2 : function () { return Ext.ComponentQuery.query('module-prodordr2-master2')[0] },
		detail1 : function () { return Ext.ComponentQuery.query('module-prodordr2-detail1')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-prodordr2-detail2')[0] },
		detailfabc : function () { return Ext.ComponentQuery.query('module-prodordr2-detail-fabc')[0] },
		workersearch : function () { return Ext.ComponentQuery.query('module-prodordr2-worker-search')[0] },
		workersearch2 : function () { return Ext.ComponentQuery.query('module-prodordr2-worker-search2')[0] },

	},


	selectAction:function(callbackFn) {
		var me = this
			master1	= me.pocket.master1(),
			master2	= me.pocket.master2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			detail = me.pocket.detail1(),
			detailfabc = me.pocket.detailfabc(),
			worksearch = me.pocket.workersearch(),
			lister = undefined
		;
		if(tindex==0){
			lister = master1;
			search.down('[name=invc_date1]').setFieldLabel('발주일자');
		}else{
			lister = master2;
			search.down('[name=invc_date1]').setFieldLabel('수주일자');
		}

		detail.getStore().clearData();
		detail.getStore().loadData([],false);

		detailfabc.getStore().clearData();
		detailfabc.getStore().loadData([],false);

		worksearch.getForm().reset();

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
		}, Ext.merge(param, { stor_grp : _global.stor_grp }));
	},

	selectDetail1 : function() {
		var me = this,
			detail = me.pocket.detail1(),
			detailfabc = me.pocket.detailfabc(),
			record = me.pocket.master1().getSelectionModel().getSelection()[0],
			workersearch = me.pocket.workersearch()
		;

		if (record) {
			workersearch.loadRecord(record);
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });

			detailfabc.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}else{
			workersearch.getForm().reset();
		}
	},

	selectDetail2 : function() {
		var me = this,
			detail = me.pocket.detail2(),
			detailfabc = me.pocket.detailfabc(),
			record = me.pocket.master2().getSelectionModel().getSelection()[0],
			workersearch2 = me.pocket.workersearch2()
		;
		if (record) {
			workersearch2.loadRecord(record);

			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });

			detailfabc.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}else{
			workersearch2.getForm().reset();

			detail.getStore().clearData();
			detail.getStore().loadData([],false);

			detailfabc.getStore().clearData();
			detailfabc.getStore().loadData([],false);
		}
	},

	//삭제
	deleteAction:function() {
		var me = this,
			lister = me.pocket.master1(),
			detail = me.pocket.detail1(),
			store  = detail.getStore(),
			records = detail.getSelectionModel().getSelection()
		;

		Ext.Msg.confirm("확인", "해당 지시 정보를 삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/prodordr2/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb		: records[0].get('invc_numb'),
							line_seqn		: records[0].get('line_seqn'),
							orig_invc_numb	: records[0].get('orig_invc_numb'),
							orig_seqn		: records[0].get('orig_seqn')
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
						mask.hide();
						store.reload();
						lister.getStore().reload();
					}
				});
			}
		});
	},



	//지시등록
	ordrAction:function() {
		var me = this,
			master = me.pocket.master2(),
			select  = master.getSelectionModel().getSelection()
		;
		var record = select[0];

		if(select.length == 0){
			Ext.Msg.alert("알림","지시 할 항목을 선택해주십시오.");
		}else{
			resource.loadPopup({
				widget : 'module-prodordr2-write-popup',
				params : {
					invc_numb : record.data.invc_numb
				},
				result : function(records) {
					master.getStore().reload();
				}
			})
		}
		return;
	},


	exportAction : function(self) {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function(self) {
		this.pocket.detail1().writer({enableLoadMask:true});
	},

});
