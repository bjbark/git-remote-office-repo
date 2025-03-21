Ext.define('module.custom.iypkg.prod.workentry2.WorkEntry2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.IypkgOrdrPopup',
	],

	models:[
		'module.custom.iypkg.prod.workentry2.model.WorkEntry2Master',
		'module.custom.iypkg.prod.workentry2.model.WorkEntry2Master2',
		'module.custom.iypkg.prod.workentry2.model.WorkEntry2Detail',
		'module.custom.iypkg.prod.workentry2.model.WorkEntry2Detail2',
		'module.custom.iypkg.prod.workentry2.model.WorkEntry2DetailFabc',
	],
	stores:[
		'module.custom.iypkg.prod.workentry2.store.WorkEntry2Master',
		'module.custom.iypkg.prod.workentry2.store.WorkEntry2Master2',
		'module.custom.iypkg.prod.workentry2.store.WorkEntry2Detail',
		'module.custom.iypkg.prod.workentry2.store.WorkEntry2Detail2',
		'module.custom.iypkg.prod.workentry2.store.WorkEntry2DetailFabc',
	],
	views : [
		'module.custom.iypkg.prod.workentry2.view.WorkEntry2Layout',
		'module.custom.iypkg.prod.workentry2.view.WorkEntry2Search',
		'module.custom.iypkg.prod.workentry2.view.WorkEntry2Master1',
		'module.custom.iypkg.prod.workentry2.view.WorkEntry2Master2',
		'module.custom.iypkg.prod.workentry2.view.WorkEntry2DetailFabc',
		'module.custom.iypkg.prod.workentry2.view.WorkEntry2Detail1',
		'module.custom.iypkg.prod.workentry2.view.WorkEntry2Detail2',
		'module.custom.iypkg.prod.workentry2.view.WorkEntry2WorkerSearch',
		'module.custom.iypkg.prod.workentry2.view.WorkEntry2WorkerSearch2',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({// TODO
			'module-workentry2-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-workentry2-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */

			'module-workentry2-master1 button[action=exportAction]'					: { click : me.exportAction			}, /* 엑셀 */
			'module-workentry2-detail1 button[action=deleteAction]'					: { click : me.deleteAction			}, /* 삭제 */
			'module-workentry2-detail1 button[action=exportAction]'					: { click : me.exportAction2		}, /* 엑셀 */

			'module-workentry2-detail2 button[action=updateAction]'					: { click : me.updateAction			}, /* 저장 */

			'module-workentry2-master1'	: {
				selectionchange	: me.selectDetail1
			},

			'module-workentry2-master2'	: {
				selectionchange	: me.selectDetail2
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-workentry2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-workentry2-search')[0] },
		master1 : function () { return Ext.ComponentQuery.query('module-workentry2-master1')[0] },
		master2 : function () { return Ext.ComponentQuery.query('module-workentry2-master2')[0] },
		detail1 : function () { return Ext.ComponentQuery.query('module-workentry2-detail1')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-workentry2-detail2')[0] },
		detailfabc : function () { return Ext.ComponentQuery.query('module-workentry2-detail-fabc')[0] },
		workersearch : function () { return Ext.ComponentQuery.query('module-workentry2-worker-search')[0] },
		workersearch2 : function () { return Ext.ComponentQuery.query('module-workentry2-worker-search2')[0] },
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
			search.down('[name=invc_date1]').setFieldLabel('입고일자');
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
			worksearch = me.pocket.workersearch()
		;

		if (record) {
			worksearch.loadRecord(record);

			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('acpt_numb') });

			detailfabc.select({
				callback : function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('acpt_numb') });
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

	updateAction:function() {
		var me = this,
			lister = me.pocket.master2(),
			detail = me.pocket.detail2(),
			fabc   = me.pocket.detailfabc(),
			record = detail.getStore().getUpdatedRecords(),
			changes = detail.getStore().getUpdatedRecords().length,
			new_invc_numb
		;

		if(changes != 0){
			for (var a = 0; a < changes; a++) {
				if(record[a].data.cstm_idcd == ''){
					Ext.Msg.alert("알림","외주 거래처를 선택해주십시오.");
					return;
				}else if(record[a].data.istt_qntt == 0){
					Ext.Msg.alert("알림","발주수량을 입력해주십시오.");
					return;
				}else if(record[a].data.istt_pric == 0){
					Ext.Msg.alert("알림","단가를 입력해주십시오.");
					return;
				}

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
					}
				});
				var x = 1;	//순번
					detail.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
					detail.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister.getStore();
			detail.getStore().sync({
				success : function(operation){
					lister.getStore().reload();
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					fabc.getStore().loadData([],false);
					tpanel.items.indexOf(tpanel.setActiveTab(0));
				}
			});
		}else{
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}

	},


	//삭제
	deleteAction:function() {
		var me = this,
			detail = me.pocket.detail1(),
			master = me.pocket.master1(),
			workersearch = me.pocket.workersearch(),
			detailfabc = me.pocket.detailfabc(),
			store  = detail.getStore(),
			records = detail.getSelectionModel().getSelection()
		;

		Ext.Msg.confirm("확인", "해당 입고 정보를 삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/prod/workentry2/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb		: records[0].get('invc_numb'),
							line_seqn		: records[0].get('line_seqn')
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

						workersearch.getForm().reset();

						detailfabc.getStore().clearData();
						detailfabc.getStore().loadData([],false);

						master.getStore().reload();
					}
				});
			}
		});
	},

	exportAction : function(self) {
		this.pocket.master1().writer({enableLoadMask:true});
	},
	exportAction2 : function(self) {
		this.pocket.detail1().writer({enableLoadMask:true});
	},


});
