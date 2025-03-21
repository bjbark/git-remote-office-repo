Ext.define('module.custom.kortc.prod.order.porderplan.PorderPlan', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WkfwPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.kortc.prod.order.porderplan.model.PorderPlanMaster',
		'module.custom.kortc.prod.order.porderplan.model.PorderPlanMaster2',
		'module.custom.kortc.prod.order.porderplan.model.PorderPlanMaster3',
		'module.custom.kortc.prod.order.porderplan.model.PorderPlanProrDetail',
		'module.custom.kortc.prod.order.porderplan.model.PorderPlanPror',
		'module.custom.kortc.prod.order.porderplan.model.PorderPlanDetail4',
		'module.custom.kortc.prod.order.porderplan.model.PorderPlanDetail2',
		'module.custom.kortc.prod.order.porderplan.model.PorderPlanDetail'
	],
	stores:[
		'module.custom.kortc.prod.order.porderplan.store.PorderPlanMaster',
		'module.custom.kortc.prod.order.porderplan.store.PorderPlanMaster2',
		'module.custom.kortc.prod.order.porderplan.store.PorderPlanMaster3',
		'module.custom.kortc.prod.order.porderplan.store.PorderPlanProrDetail',
		'module.custom.kortc.prod.order.porderplan.store.PorderPlanDetail',
		'module.custom.kortc.prod.order.porderplan.store.PorderPlanDetail2',
		'module.custom.kortc.prod.order.porderplan.store.PorderPlanDetail4',
		'module.custom.kortc.prod.order.porderplan.store.PorderPlanPror',
	],
	views : [
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanLayout',
		/* 현황 */
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanSearch',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanListerMaster',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanListerMaster2',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanListerMaster3',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanListerProrDetail',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanListerDetail',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanListerDetail2',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanListerDetail3',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanListerDetail4',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanListerPror',
		'module.custom.kortc.prod.order.porderplan.view.PorderPlanProrPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-porderplan-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-porderplan-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-porderplan-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-porderplan-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회     */
			'module-porderplan-lister-pror button[action=prorAction]'				: { click : me.prorAction         }, /* 생산지시 */
			'module-porderplan-lister-pror button[action=deleteAction]'				: { click : me.deleteAction       }, /* 삭제 */
			'module-porderplan-lister-master2 button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀     */
			'module-porderplan-lister-master3 button[action=exportAction]'			: { click : me.exportAction2      }, /* 엑셀     */
			'module-porderplan-lister-pror button[action=exportAction]'				: { click : me.exportProrAction   }, /* 엑셀     */

			'module-porderplan-lister-master' : {
				selectionchange : me.selectDetail
			},
			'module-porderplan-lister-master2' : {
				selectionchange : me.selectDetail2
			},
			'module-porderplan-lister-master3' : {
				selectionchange : me.selectDetail3
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-porderplan-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-porderplan-search')[0] },
		lister : {
			master      : function () { return Ext.ComponentQuery.query('module-porderplan-lister-master')[0]  },
			master2     : function () { return Ext.ComponentQuery.query('module-porderplan-lister-master2')[0] },
			master3     : function () { return Ext.ComponentQuery.query('module-porderplan-lister-master3')[0] },
			prordetail  : function () { return Ext.ComponentQuery.query('module-porderplan-lister-pror-detail')[0] },
			pror        : function () { return Ext.ComponentQuery.query('module-porderplan-lister-pror')[0]    },
			detail      : function () { return Ext.ComponentQuery.query('module-porderplan-lister-detail')[0]  },
			detail2     : function () { return Ext.ComponentQuery.query('module-porderplan-lister-detail2')[0] },
			detail3     : function () { return Ext.ComponentQuery.query('module-porderplan-lister-detail3')[0] },
			detail4     : function () { return Ext.ComponentQuery.query('module-porderplan-lister-detail4')[0] }
		},
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister	= me.pocket.lister.master(),
			master3	= me.pocket.lister.master3(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			pror	= me.pocket.lister.pror()
		;
		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			if(tindex==1){
				lister = master3;
			}else{
				pror.getStore().clearData();
				pror.getStore().loadData([],false);
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {  }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},


	selectDetail : function(grid, record) {
		var me		= this,
			master2	= me.pocket.lister.master2(),
			detail	= me.pocket.lister.detail(),
			detail2	= me.pocket.lister.detail2(),
			detail4	= me.pocket.lister.detail4(),
			pror	= me.pocket.lister.pror()
		;
		if (record[0]) {
			pror.getStore().clearData();
			pror.getStore().loadData([],false);
			master2.getStore().clearData();
			master2.getStore().loadData([],false);
			master2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, { invc_numb : record[0].get('invc_numb') });
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, { invc_numb : record[0].get('invc_numb') });
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, { invc_numb : record[0].get('invc_numb') });
			detail4.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
				}, scope:me
			}, { invc_numb : record[0].get('invc_numb') });
		}
	},
	selectDetail2 : function(grid, record) {
		var	me = this,
			pror = me.pocket.lister.pror()
		;
		if (record[0]) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			pror.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, record[0].data);
		}
	},
	selectDetail3 : function(grid, record) {
		var me = this,
			lister = me.pocket.lister.prordetail()
		;
		if (record[0]) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
				}, scope:me
			}, record[0].data);
		}
	},


	prorAction:function() {
		var	me = this,
			master  = me.pocket.lister.master(),
			master2 = me.pocket.lister.master2(),
			pror    = me.pocket.lister.pror(),
			select  = master.getSelectionModel().getSelection()[0],
			select2 = master2.getSelectionModel().getSelection()[0]
			select3 = pror.getSelectionModel().getSelection()[0]
		;
		if(select2){
			var	record = "",
				_set      = 'insert',
				pror_numb = ''
			;
			if(select3){
				_set   = 'update';
				record = Ext.merge(select.data,select2.data,{
					pror_numb : select3.get('invc_numb'),
					indn_qntt : select3.get('indn_qntt'),
					strt_dttm : select3.get('strt_dttm'),
					endd_dttm : select3.get('endd_dttm'),
					lott_numb : select3.get('lott_numb'),
					remk_text : select3.get('remk_text'),
					wkfw_idcd : select3.get('wkfw_idcd'),
					wkfw_name : select3.get('wkfw_name')
				});
			}else{
				Ext.Ajax.request({
					url			: _global.location.http() + '/listener/seq/maxid.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id	: _global.stor_id,
							table_nm: 'pror_mast'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						pror_numb = result.records[0].seq;
					}
				});
				record = Ext.merge(select.data,select2.data,{pror_numb : pror_numb,lott_numb:"",indn_qntt:""});
			}
			var popup = resource.loadPopup({
				widget : 'module-porderplan-pror-popup',
				params : {
					_set : _set,
				}
			});
			popup.down('form').getForm().setValues(record);
		}else{
			Ext.Msg.alert('알림','수주품목을 선택해주세요.');
		}
	},

	deleteAction:function(){
		var	me = this,
			lister = me.pocket.lister.pror(),
			store  = lister.getStore(),
			select = lister.getSelectionModel().getSelection()
		;
		if(select.length>0){
			var msg = "";
			Ext.each(select,function(rec){
				if(rec.get('prog_stat_dvcd')!=0){
					msg = "진행중인 지시는 삭제할 수 없습니다.";
				}
			})

			if(msg!=""){
				Ext.Msg.alert('알림',msg);
				return;
			}

			store.remove(select);
			store.sync({
				callback:function(){

				}
			})
		}
	},




	exportAction : function(self) {
		this.pocket.lister.master2().writer({enableLoadMask:true});
	},

	exportAction2 : function(self) {
		this.pocket.lister.master3().writer({enableLoadMask:true});
	},
	exportProrAction : function(self) {
		this.pocket.lister.pror().writer({enableLoadMask:true});
	}
});
