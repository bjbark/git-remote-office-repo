Ext.define('module.custom.hantop.prod.order.prodorder.ProdOrder', { extend : 'Axt.app.Controller',


	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
	],

	models:[
		'module.custom.hantop.prod.order.prodorder.model.ProdOrderMaster',
		'module.custom.hantop.prod.order.prodorder.model.ProdOrderDetail',
		'module.custom.hantop.prod.order.prodorder.model.ProdOrderCofm',
		'module.custom.hantop.prod.order.prodorder.model.ProdOrderCofmDetail',
		'module.custom.hantop.prod.order.prodorder.model.ProdOrderCofmDetail2',
		'module.custom.hantop.prod.order.prodorder.model.ProdOrderDetail3',
	],
	stores:[
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderMaster',
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderDetail',
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofm',
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail',
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail2',
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail3_1_1',
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail3_1_2',
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderCofmDetail3_2',
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderDetail3',
		'module.custom.hantop.prod.order.prodorder.store.ProdOrderDetail3_2',
	],
	views : [
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderLayout',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderSearch',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerMaster',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofm',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmDetail',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmDetail2',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmDetail3_1_1',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmDetail3_1_2',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmDetail3_2',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerCofmSearch',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail3',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail3_BF',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail3_SF',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail3_MF',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail3_MC',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail3_GB',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail3_GL',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetail3_RN',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderDetail3Search',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderPopup',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderCutPopup',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderCofmPopup',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderOptmPopup',
		'module.custom.hantop.prod.order.prodorder.view.ProdItemCancelPopup',
		'module.custom.hantop.prod.order.prodorder.view.ProdOrderListerDetailEditor'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-prodorder-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-prodorder-layout button[action=addManual]'						: { click : me.addManual          }, /* << */
			'module-prodorder-layout button[action=removeManual]'					: { click : me.removeManual       }, /* >> */
			'module-prodorder-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-prodorder-lister-master button[action=cutPrintAction]'			: { click : me.cutPrintAction     }, /* 절단지시서 발행 */
			'module-prodorder-lister-master button[action=workPrintAction]'			: { click : me.workPrintAction    }, /* 작업지시서 발행 */
			'module-prodorder-lister-master button[action=glssAction]'				: { click : me.glssAction         }, /* 유리절단 */
			'module-prodorder-lister-master button[action=cofmCancel]'				: { click : me.cofmAction         }, /* 확정취소 */
			'module-prodorder-lister-detail button[action=itemCancelAction]'		: { click : me.itemCancelAction   }, /* 품목지시 취소 */
			'module-prodorder-lister-detail button[action=exportAction]'			: { click : me.exportAction2      }, /* 엑셀 */

			'module-prodorder-lister-cofm button[action=exportAction]'				: { click : me.exportAction4      }, /* 엑셀 */
			'module-prodorder-lister-cofm button[action=cofm]'						: { click : me.cofmAction         }, /* 확정 */
			'module-prodorder-lister-cofm button[action=reworkAction]'				: { click : me.reworkAction       }, /* 최적화 */
			'module-prodorder-lister-cofmdetail  button[action=exportAction]'		: { click : me.exportAction5      }, /* 엑셀 */
			'module-prodorder-lister-cofmdetail2 button[action=manualAction]'		: { click : me.manualAction       }, /* 수동으로 전환 */
			'module-prodorder-lister-cofmdetail2 button[action=itemAction]'			: { click : me.itemAction         }, /* 품목 최적화 */
			'module-prodorder-lister-cofmdetail3_2 button[action=updateAction]'		: { click : me.cofmUpdateAction   }, /* 수동 최적화 저장 */

			'module-prodorder-lister-detail3 button[action=exportAction]'			: { click : me.exportAction3      }, /* 엑셀 */

			'module-prodorder-lister-detail3_bf button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder-lister-detail3_gb button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder-lister-detail3_gl button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder-lister-detail3_mc button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder-lister-detail3_mf button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder-lister-detail3_rn button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */
			'module-prodorder-lister-detail3_sf button[action=exportAction]'		: { click : me.exportActions      }, /* 엑셀 */

			'module-prodorder-lister-detail3 button[action=updateAction]'			: { click : me.updateAction       }, /* 저장 */
			'module-prodorder-lister-detaileditor button[action=selectAction2]'		: { click : me.selectAction2      }, /* 상세검색*/
			'module-prodorder-layout #mainpanel' : {
				tabchange : me.mainTabChange
			},
			'module-prodorder-layout #cofmpanel' : {
				tabchange : me.mainTabChange2
			},
			'module-prodorder-layout #detailpanel' : {
				tabchange : me.mainTabChange3
			},
			'module-prodorder-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-prodorder-lister-cofm' : {
				itemdblclick    : me.selectCofm,
				selectionchange : me.selectCofmRecord
			},
			'module-prodorder-lister-detail' : {
				itemdblclick    : me.dblclickDetail,
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout           : function () { return Ext.ComponentQuery.query('module-prodorder-layout')[0] },
		search           : function () { return Ext.ComponentQuery.query('module-prodorder-search')[0] },
		detail3search    : function () { return Ext.ComponentQuery.query('module-prodorder-detail3-search')[0] },
		master           : function () { return Ext.ComponentQuery.query('module-prodorder-lister-master')[0] },
		detail           : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detail')[0] },
		cofm             : function () { return Ext.ComponentQuery.query('module-prodorder-lister-cofm')[0] },
		cofmdetail       : function () { return Ext.ComponentQuery.query('module-prodorder-lister-cofmdetail')[0] },
		cofmdetail2      : function () { return Ext.ComponentQuery.query('module-prodorder-lister-cofmdetail2')[0] },
		cofmdetail3_1_1  : function () { return Ext.ComponentQuery.query('module-prodorder-lister-cofmdetail3_1_1')[0] },
		cofmdetail3_1_2  : function () { return Ext.ComponentQuery.query('module-prodorder-lister-cofmdetail3_1_2')[0] },
		cofmdetail3_2    : function () { return Ext.ComponentQuery.query('module-prodorder-lister-cofmdetail3_2')[0] },
		cofmsearch       : function () { return Ext.ComponentQuery.query('module-prodorder-lister-cofmsearch')[0] },
		detail3          : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detail3')[0] },
		detail3_bf       : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detail3_bf')[0] },
		detail3_sf       : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detail3_sf')[0] },
		detail3_mf       : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detail3_mf')[0] },
		detail3_mc       : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detail3_mc')[0] },
		detail3_gb       : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detail3_gb')[0] },
		detail3_gl       : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detail3_gl')[0] },
		detail3_rn       : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detail3_rn')[0] },
		editor           : function () { return Ext.ComponentQuery.query('module-prodorder-lister-detaileditor')[0] },
	},

	//조회
	selectAction:function() {
		var me			= this,
			lister		= me.pocket.master(),
			cofm		= me.pocket.cofm(),
			search		= me.pocket.search(),
			tabPanel	= me.pocket.layout().down('#mainpanel'),
			tindex		= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			param		= search.getValues()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		if(tindex==0){
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}else if(tindex==1){
			mask.show();
			cofm.select({
				 callback:function(records, operation, success) {
					if (success) {
						cofm.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},
	mainTabChange : function(tabPanel, newCard, oldCard){
		var me				= this,
			tindex			= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			master			= me.pocket.master(),
			detail			= me.pocket.detail(),
			cofm			= me.pocket.cofm(),
			detail3_bf		= me.pocket.detail3_bf(),
			masterRecord	= master.getSelectionModel().getSelection()[0],
			detailRecord	= detail.getSelectionModel().getSelection()[0],
			detail3Search	= me.pocket.detail3search(),
			detailPanel		= me.pocket.layout().down('#detailpanel'),
			values,add,msg;
		;
		if(tindex==1){
			me.pocket.search().down('[itemId=cofm_chk]').show();
		}else{
			me.pocket.search().down('[itemId=cofm_chk]').hide();
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});

		if(tindex == 1){
			mask.show();
			cofm.select({
				callback:function(records, operation, success) {
					if (success) {
						cofm.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
		if( tindex == 2 ){
			if(masterRecord && detailRecord){
				if(masterRecord.get('pror_yorn')!='1'){
					msg = '지시확정된 수주만 작업지시내역 조회가 가능합니다.';
				}else{
					mask.show();

					detail3Search.getForm().setValues(masterRecord.data);
					detail3Search.getForm().setValues(detailRecord.data);
					values = detail3Search.getValues();
					add    = detail3Search.down('[name=add]').getValue();
					detailPanel.setActiveTab(1);
					detail3_bf.select({
						 callback:function(records, operation, success) {
							if (success) {
								detail3_bf.getSelectionModel().select(0);
							} else { me.pocket.editor().getForm().reset(true); }
							mask.hide();
						}, scope:me
					}, Ext.merge(values,{add:add,cofm_yorn : '1',bfsf_dvcd:'bf'},{ stor_grp : _global.stor_grp }));
				}
			}else{
				msg= '수주 내용을 선택해주세요.';
			}
			if(msg){
				Ext.Msg.alert('알림',msg);
				tabPanel.setActiveTab(0);
			}
		}
	},
	mainTabChange2 : function(tabPanel, newCard, oldCard){
		var me				= this,
			tindex			= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			detail			= me.pocket.cofmdetail(),
			detail2			= me.pocket.cofmdetail2(),
			detail3_1_1		= me.pocket.cofmdetail3_1_1(),
			detail3_1_2		= me.pocket.cofmdetail3_1_2(),
			detail3_2		= me.pocket.cofmdetail3_2(),
			cofm			= me.pocket.cofm(),
			search			= me.pocket.cofmsearch(),
			param			= me.pocket.search().getValues(),
			select			= cofm.getSelectionModel().getSelection()[0],
			val			= me.pocket.editor().getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		if(tindex==0 && select){
			detail.select({
			 callback:function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge({invc_numb : select.get('invc_numb'), bfsf_dvcd : val.bfsf_dvcd},{ stor_grp : _global.stor_grp }));
		}else if( tindex == 1 && select){
			detail2.select({
			 callback:function(records, operation, success) {
					if (success) {
						detail.getSelectionModel().select(0);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge({ chk : param.chk, invc_numb : select.get('invc_numb')},{ stor_grp : _global.stor_grp }));
		}else if (tindex==2){
			search.down('[name=both_cutt]').setValue('0');
			search.down('[name=stnd_abar_leng]').setValue(0);
			search.down('[name=auto_yorn]').setValue('0');
			search.down('[name=ydge_used_yorn]').setValue('0');

			if(select){
				detail3_1_1.getStore().clearData();
				detail3_1_1.getStore().loadData([],false);
				detail3_1_2.getStore().clearData();
				detail3_1_2.getStore().loadData([],false);
				detail3_2.select({
				 callback:function(records, operation, success) {
						if (success) {
							detail.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge({invc_numb : select.get('invc_numb')},{ stor_grp : _global.stor_grp }));
			}else{
				mask.hide();
			}
		}else{
			mask.hide();
		}
	},
	mainTabChange3 : function(tabPanel, newCard, oldCard){
		var me				= this,
			tindex			= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			detail3search	= me.pocket.detail3search(),
			add				= detail3search.down('[name=add]').getValue(),
			values			= detail3search.getValues(),
			detail,
			bfsf_dvcd = '',rn_dvcd=''
		;
		if( tindex == 1 ){
			detail = me.pocket.detail3_bf();
			bfsf_dvcd = 'bf';
		}else if(tindex==2){
			detail = me.pocket.detail3_sf();
			bfsf_dvcd = 'sf';
		}else if(tindex==3){
			detail = me.pocket.detail3_mf();
			bfsf_dvcd = 'mf';
		}else if(tindex==4){
			detail = me.pocket.detail3_mc();
			bfsf_dvcd = 'mc';
		}else if(tindex==5){
			detail = me.pocket.detail3_gb();
			bfsf_dvcd = 'gb';
		}else if(tindex==6){
			detail = me.pocket.detail3_gl();
			bfsf_dvcd = 'glss';
		}else if(tindex==7){
			detail = me.pocket.detail3_rn();
			rn_dvcd = 'rn';
		}
		if(detail){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
//			var cofm_yorn = '';
			mask.show();
//			if(!add){
//				cofm_yorn='1';
//			}
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope:detail
			}, Ext.merge({	add : add
						 , auto_yorn : values.auto_yorn
						 , cmpl_yorn:values.cmpl_yorn
						 , bfsf_dvcd: bfsf_dvcd
						 , rn_dvcd:rn_dvcd
						 , cofm_yorn : '1'
						 , invc_numb : values.invc_numb
						 , line_seqn : values.line_seqn
				}, { stor_grp : _global.stor_grp }));
		}
	},

	updateAction:function(){
		var	me		= this,
			detail3	= me.pocket.detail3(),
			store	= detail3.getStore()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		store.sync({
			success : function(operation){ store.reload(); },
			failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
			callback: function(operation){ mask.hide(); },
		});
	},
	//선택
	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},
	//디테일 조회
	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.detail()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}
	},
	//선택
	selectCofmRecord:function( grid, records ){
		var me = this,
			cofmdetail = me.pocket.cofmdetail(),
			cofmdetail2 = me.pocket.cofmdetail2(),
			cofmdetail3_1_1 = me.pocket.cofmdetail3_1_1(),
			cofmdetail3_1_2 = me.pocket.cofmdetail3_1_2(),
			cofmdetail3_2 = me.pocket.cofmdetail3_2()
		;
		cofmdetail.getStore().clearData();
		cofmdetail.getStore().loadData([],false);
		cofmdetail2.getStore().clearData();
		cofmdetail2.getStore().loadData([],false);
		cofmdetail3_1_1.getStore().clearData();
		cofmdetail3_1_1.getStore().loadData([],false);
		cofmdetail3_1_2.getStore().clearData();
		cofmdetail3_1_2.getStore().loadData([],false);
		cofmdetail3_2.getStore().clearData();
		cofmdetail3_2.getStore().loadData([],false);
	},


	//디테일 조회
	selectCofm : function(grid, record) {
		var me              = this,
			tabPanel        = me.pocket.layout().down('#cofmpanel'),
			tindex          = tabPanel.items.indexOf(tabPanel.getActiveTab()),
			cofmdetail      = me.pocket.cofmdetail(),
			cofmdetail2     = me.pocket.cofmdetail2()
			cofmdetail3_1_1 = me.pocket.cofmdetail3_1_1(),
			cofmdetail3_1_2 = me.pocket.cofmdetail3_1_2(),
			cofmdetail3_2   = me.pocket.cofmdetail3_2(),
			search          = me.pocket.search(),
			param           = search.getValues(),
			editor          = me.pocket.editor(),
			val             = editor.getValues()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			if(tindex==0){
				cofmdetail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { invc_numb : record.get('invc_numb'), add:'true', bfsf_dvcd : val.bfsf_dvcd });
			}else if (tindex==1){
				cofmdetail2.select({
					 callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { chk : param.chk, invc_numb : record.get('invc_numb') });
			}else if (tindex==2){
				cofmdetail3_2.select({
					 callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { invc_numb : record.get('invc_numb') });
				cofmdetail3_1_1.getStore().clearData();
				cofmdetail3_1_1.getStore().loadData([],false);
				cofmdetail3_1_2.getStore().clearData();
				cofmdetail3_1_2.getStore().loadData([],false);
			}else{
				mask.hide();
			}
		}
	},
	dblclickDetail : function(grid,record){
		var	me = this,
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		tpanel.setActiveTab(2);
	},
	reworkAction : function(grid,record){
		var	me = this,
			master,masterRecord,fix_yorn,
			cofm = me.pocket.cofm()
		;

		var records = cofm.getSelectionModel().getSelection();

		if(!records || records.length<1){
			Ext.Msg.alert("알림","수주목록을 선택해주십시오.");
			return;
		}

		if(grid.itemId=='cofm'){
			master = me.pocket.cofm();
			masterRecord = master.getSelectionModel().getSelection()
			fix_yorn	= 0;
		}else{
			master			= me.pocket.master(),
			masterRecord	= master.getSelectionModel().getSelection(),
			fix_yorn	= 0;
		}
		if(masterRecord){
			Ext.Msg.confirm("확인", "최적화를 진행하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
					mask.show();
					var a = '';
					for(var i =0; i< masterRecord.length ; i++){
						if(i==0){
							a += "[";
						}
							a+= '{\'invc_numb\':\''+masterRecord[i].get('invc_numb')+'\'}';
						if(i != masterRecord.length -1){
							a+=",";
						}else{
							a+="]";
						}
					}
					var _param = '{\'fix_yorn\':'+fix_yorn+',\'records\':'+a+'}';
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/hntop/prod/order/prodorder/set/rework.do',
						params	: {
							token : _global.token_id,
							param : _param
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							if	(!result.success ){
								Ext.Msg.error(result.message );
								return;
							} else {
								master.getStore().reload();
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
						}
					});
				}
			});
		}
	},
	manualAction:function(){
		var	me          = this,
			cofmdetail2 = me.pocket.cofmdetail2(),
			record      = cofmdetail2.getSelectionModel().getSelection()
		;
		var a = "";
		if(record.length >0 ){
			for(var i =0; i< record.length ; i++){
				if(record[i].get('auto_yorn')==0){
					Ext.Msg.alert('알림','자동여부를 확인해주세요.');
					return;
				}
				if(i==0){
					a += "[";
				}
					a+=   '{\'lott_numb\':\''+record[i].get('lott_numb') +
					      '\',\'item_idcd\':\''+ record[i].get('item_idcd')+
					      '\',\'ivst_ordr\':\''+record[i].get('ivst_ordr')+'\'}';
				if(i != record.length -1){
					a+=",";
				}else{
					a+="]";
				}
			}
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hntop/prod/order/prodorder/set/manual.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
							records		: a,
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						return;
					} else {
						cofmdetail2.getStore().reload();
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},
	itemAction : function(){
		var	me		= this,
			a		= '',
			master	= me.pocket.cofm(),
			detail	= me.pocket.cofmdetail2(),
			masterRecord = master.getSelectionModel().getSelection(),
			detailRecord = detail.getSelectionModel().getSelection()
		;

		if(masterRecord.length != 1){
			if(masterRecord.length > 1){
				Ext.Msg.alert('알림','대기내역을 하나만 선택해주세요.');
			}else{
				Ext.Msg.alert('알림','대기내역을 선택해주세요.');
			}
			return;
		}
		if(detailRecord.length != 1){
			if(detailRecord.length > 1){
				Ext.Msg.alert('알림','집계내역을 하나만 선택해주세요.');
			}else{
				Ext.Msg.alert('알림','집계내역을 선택해주세요.');
			}
			return;
		}
		if(detailRecord[0].get('auto_yorn')==0){
			Ext.Msg.alert('알림','자동여부를 확인해주세요.');
			return;
		}
		a += '[{\'invc_numb\':\''+masterRecord[0].get('invc_numb')+'\'}]';
		console.log(detailRecord[0].get('ivst_ordr'));
		resource.loadPopup({
			widget : 'module-prodorder-optm-popup',
			params : {
				invc_string		: a,
				orgn_ivst_ordr	: detailRecord[0].get('ivst_ordr'),
				title			: '품목 최적화',
				item_idcd		: detailRecord[0].get('item_idcd'),
				bsmt_leng		: detailRecord[0].get('bsmt_leng')
			}
		});
	},
	addManual:function(){
		var	me     = this,
			search = me.pocket.cofmsearch(),
			cofmdetail3_1_1 = me.pocket.cofmdetail3_1_1(),
			cofmdetail3_1_2 = me.pocket.cofmdetail3_1_2(),
			cofmdetail3_2 = me.pocket.cofmdetail3_2(),
			select = cofmdetail3_2.getSelectionModel().getSelection(),
			param  = search.getValues(),
			length = 0,sum = 0,size=0,selc_leng =0
		;
		if(param.stnd_abar_leng>0){
			if(select.length >0){
					sum = cofmdetail3_1_1.getStore().sum('cutt_leng');
					size = cofmdetail3_1_1.getStore().data.items.length;
					length = param.stnd_abar_leng - (20+(8*size)+sum);
				if(param.both_cutt==0){
					for (var i = 0; i < select.length; i++) {
						if(size > 0){
							if(cofmdetail3_1_1.getStore().data.items[0].get('item_idcd') != select[i].get('item_idcd')){
								Ext.Msg.alert('알림','같은 자재만 등록가능합니다.');
								return;
							}
						}else{
							if(select[0].get('item_idcd') != select[i].get('item_idcd')){
								Ext.Msg.alert('알림','같은 자재만 등록가능합니다.');
								return;
							}
						}
						selc_leng += select[i].get('cutt_leng');
					}
					if(selc_leng+8 <= length){
						cofmdetail3_1_1.getStore().add(select);
						cofmdetail3_2.getStore().remove(select);
					}else{
						Ext.Msg.alert('알림','추가하려는 절단길이의 합이 원자재길이를 초과하였습니다.');
					}
				}else if(param.both_cutt==1){
					if(select.length != 1 ){
						Ext.Msg.alert('알림','동시절단시 자재는 하나씩 등록 가능합니다..');
					}else{
						if(size > 0){
							if(cofmdetail3_1_1.getStore().data.items[0].get('item_idcd') != select[0].get('item_idcd')){
								Ext.Msg.alert('알림','같은 자재만 등록가능합니다.');
								return;
							}
						}
						selc_leng += select[0].get('cutt_leng');
						if(selc_leng+8 <= length){
							var chk = 0 ;
							cofmdetail3_1_1.getStore().add(select);
							cofmdetail3_2.getStore().remove(select);
							for (var i = 0; i < cofmdetail3_2.getStore().data.items.length; i++) {
								if(cofmdetail3_2.getStore().data.items[i].get('item_idcd')==select[0].get('item_idcd')&&cofmdetail3_2.getStore().data.items[i].get('cutt_leng')==select[0].get('cutt_leng')){
									cofmdetail3_1_2.getStore().add(cofmdetail3_2.getStore().data.items[i]);
									cofmdetail3_2.getStore().remove(cofmdetail3_2.getStore().data.items[i]);
									chk =1;
									return;
								}
							}
							if(chk == 0){
								cofmdetail3_1_1.getStore().remove(select);
								cofmdetail3_2.getStore().add(select);
								Ext.Msg.alert('알림','동시절단 가능한 같은 절단길이가 없습니다.');
							}
						}else{
							Ext.Msg.alert('알림','추가하려는 절단길이의 합이 원자재길이를 초과하였습니다.');
						}
					}
				}
			}
			if(cofmdetail3_1_1.getStore().data.items.length>0){
				search.down('[name=both_cutt]').readOnly = true;
			}else{
				search.down('[name=both_cutt]').readOnly = false;
			}
		}else{
			Ext.Msg.alert('알림','원자재길이를 입력해주세요.');
			return;
		}
	},
	removeManual:function(){
		var	me     = this,
			search = me.pocket.cofmsearch(),
			cofmdetail3_1_1 = me.pocket.cofmdetail3_1_1(),
			cofmdetail3_1_2 = me.pocket.cofmdetail3_1_2(),
			cofmdetail3_2 = me.pocket.cofmdetail3_2(),
			select = cofmdetail3_1_1.getSelectionModel().getSelection(),
			param  = search.getValues(),
			length = 0,sum = 0,size=0,selc_leng =0
		;
		if(select.length >0){
			if(param.both_cutt==0){
				cofmdetail3_1_1.getStore().remove(select);
				cofmdetail3_2.getStore().add(select);
			}else if(param.both_cutt==1){
				cofmdetail3_1_1.getStore().remove(select);
				for (var i = 0; i < cofmdetail3_1_2.getStore().data.items.length; i++) {
					if(cofmdetail3_1_2.getStore().data.items[i].get('item_idcd')==select[0].get('item_idcd')&&cofmdetail3_1_2.getStore().data.items[i].get('cutt_leng')==select[0].get('cutt_leng')){
						cofmdetail3_2.getStore().add(cofmdetail3_1_2.getStore().data.items[i]);
						cofmdetail3_1_2.getStore().remove(cofmdetail3_1_2.getStore().data.items[i]);
						break;
					}
				}

				cofmdetail3_2.getStore().add(select);
			}
		}
		if(cofmdetail3_1_1.getStore().data.items.length<1){
			search.down('[name=both_cutt]').readOnly = false;
		}
	},
	cofmAction : function(grid,record){
		var	me = this,
			master,masterRecord,fix_yorn,chk=0,title
		;
		if(grid.itemId=='cofms'){
			master = me.pocket.cofm();
			masterRecord = master.getSelectionModel().getSelection();
			fix_yorn	= 1;
			title = '확정';
			if(masterRecord[0]){
				var a = '', str = '';
				for(var i =0; i< masterRecord.length ; i++){
					if(masterRecord[i].get('pror_yorn')=='1'){
						str += masterRecord[i].get('invc_numb')+' ';
					}
					if(i==0){
						a += "[";
					}
						a+= '{\'invc_numb\':\''+masterRecord[i].get('invc_numb')+'\'}';
					if(i != masterRecord.length -1){
						a+=",";
					}else{
						a+="]";
					}
				}
				if(str != ''){
					Ext.Msg.alert('알림','이미 지시확정된 내역입니다.</br>(<span style="color:red";>'+str+'</span>)');
					return;
				}
				resource.loadPopup({
					widget : 'module-prodorder-cofm-popup',
					params : {invc_string:a,fix_yorn:fix_yorn,title:title}
				});
			}else{
				Ext.Msg.alert('알림','수주을 선택해주세요.')
			}
		}else{
			master			= me.pocket.master(),
			masterRecord	= master.getSelectionModel().getSelection(),
			fix_yorn	= 0,
			title = '확정취소';
			if(masterRecord.length > 0){
				for (var i = 0; i < masterRecord.length; i++) {
					if(masterRecord[i].get('pror_yorn')=='0'){
						Ext.Msg.alert('알림','확정되지 않은 수주입니다. 다시 확인해주세요.');
						chk = 1;
						break;
					}else{
						if(masterRecord[i].get('cmpl_dvcd')>1){
							Ext.Msg.alert('알림','대기중인 수주만 확정취소가능합니다. 다시 확인해주세요.');
							chk = 1;
							break;
						}
					}
				}
				if(chk == 1){
					return;
				}
			}
			if(masterRecord[0]){
				Ext.Msg.confirm("확인", "확정을 취소하시겠습니까?", function(button) {
					if (button == 'yes') {
						var a = '';
						for(var i =0; i< masterRecord.length ; i++){
							if(i==0){
								a += "[";
							}
								a+= '{\'invc_numb\':\''+masterRecord[i].get('invc_numb')+'\'}';
							if(i != masterRecord.length -1){
								a+=",";
							}else{
								a+="]";
							}
						}
						var _param = '{\'fix_yorn\':'+fix_yorn+',\'records\':'+a+'}';
						var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
						mask.show();

						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/hntop/prod/order/prodorder/set/cofmcancel.do',
							params	: {
								token : _global.token_id,
								param : _param
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
									master.getStore().reload();
									me.pocket.master().getStore().reload();
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								mask.hide();
							}
						});
					}
				});
			}else{
				Ext.Msg.alert('알림','수주을 선택해주세요.')
			}
		}
	},
	cofmUpdateAction:function(){
		var	me = this,
			search          = me.pocket.cofmsearch(),
			cofmdetail3_1_1 = me.pocket.cofmdetail3_1_1(),
			cofmdetail3_1_2 = me.pocket.cofmdetail3_1_2(),
			cofmdetail3_2   = me.pocket.cofmdetail3_2(),
			cofm            = me.pocket.cofm(),
			param           = search.getValues(),
			select          = cofm.getSelectionModel().getSelection()[0],
			maxIvst         = 0
		;
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/hntop/prod/order/prodorder/get/maxIvst_ordr.do',
			params	: {
				token     : _global.token_id,
				param     : JSON.stringify({ invc_numb :  select.get('invc_numb') })
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					if(result.records[0]){
						maxIvst = result.records[0].max;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		if(maxIvst>0){
			if(param.both_cutt==0){
				cofmdetail3_1_1.getStore().each(function(record){
					if(record.get('cutt_leng')>0){
						record.set('invc_numb',select.get('invc_numb'));
						record.set('ydge_used_yorn',param.ydge_used_yorn);
						record.set('auto_yorn',param.auto_yorn);
						record.set('stnd_abar_leng',param.stnd_abar_leng);
						record.set('ivst_ordr',maxIvst);
						record.set('chk',1);
						record.setDirty();
					}else{
						Ext.Msg.alert('알림','절단길이가 0이하인 자재는 등록할 수 없습니다.');
						return;
					}
				});
				cofmdetail3_1_1.getStore().sync();
			}else if(param.both_cutt==1){
				cofmdetail3_1_1.getStore().each(function(record){
					if(record.get('cutt_leng')>0){
						record.set('invc_numb',select.get('invc_numb'));
						record.set('ydge_used_yorn',param.ydge_used_yorn);
						record.set('auto_yorn',param.auto_yorn);
						record.set('stnd_abar_leng',param.stnd_abar_leng);
						record.set('ivst_ordr',maxIvst);
						record.set('chk',1);
						record.setDirty({
							callback: function(operation){
								cofmdetail3_2.getStore().reload();
							}
						});
					}else{
						Ext.Msg.alert('알림','절단길이가 0이하인 자재는 등록할 수 없습니다.');
						return;
					}
				});
				cofmdetail3_1_2.getStore().each(function(record){
					if(record.get('cutt_leng')>0){
						record.set('invc_numb',select.get('invc_numb'));
						record.set('ydge_used_yorn',param.ydge_used_yorn);
						record.set('stnd_abar_leng',param.stnd_abar_leng);
						record.set('auto_yorn',param.auto_yorn);
						record.set('ivst_ordr',maxIvst);
						record.set('chk',2);
						record.setDirty();
					}else{
						Ext.Msg.alert('알림','절단길이가 0이하인 자재는 등록할 수 없습니다.');
						return;
					}
				});
				cofmdetail3_1_1.getStore().sync();
				cofmdetail3_1_2.getStore().sync({
					callback: function(operation){
						cofmdetail3_2.getStore().reload();
					}
				});
			}
			cofmdetail3_1_1.getStore().clearData();
			cofmdetail3_1_1.getStore().loadData([],false);
			cofmdetail3_1_2.getStore().clearData();
			cofmdetail3_1_2.getStore().loadData([],false);
		}
	},
	glssAction : function(grid,record){
		var	me = this,
		master			= me.pocket.master(),
		masterRecord	= master.getSelectionModel().getSelection()[0],
		jrf = 'hntop_wpror_cut.jrf',
		resId = _global.hq_id.toUpperCase()
		;
		if(masterRecord){
			var invc_numb = masterRecord.data.invc_numb;
			var arg =	'invc_numb~'+invc_numb+'~';

			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}else{
			Ext.Msg.alert('알림','수주을 선택해주세요.')
		}
	},
	workPrintAction : function(grid,record){
		var	me = this,
			master			= me.pocket.master(),
			masterRecord	= master.getSelectionModel().getSelection()[0]
		;
		if(masterRecord){
			resource.loadPopup({
				widget : 'module-prodorder-popup',
			});
		}else{
			Ext.Msg.alert('알림','수주을 선택해주세요.')
		}
	},
	cutPrintAction : function(grid,record){
		var	me = this,
			master			= me.pocket.master(),
			masterRecord	= master.getSelectionModel().getSelection()[0]
		;
		if(masterRecord){
			resource.loadPopup({
				widget : 'module-prodorder-cut-popup',
			});
		}else{
			Ext.Msg.alert('알림','수주을 선택해주세요.')
		}
	},

	itemCancelAction : function(grid,record){
		var	me = this,
			detail			= me.pocket.detail(),
			detailRecord	= detail.getSelectionModel().getSelection()[0]
		;
		if(detailRecord){
			resource.loadPopup({
				widget : 'module-prodorder-cancel-popup',
			});
		}else{
			Ext.Msg.alert('알림','품목을 선택해주세요.')
		}
	},

	//엑셀
	exportAction : function(self) {
		this.pocket.master().writer({enableLoadMask:true});
	},

	//엑셀2
	exportAction2 : function(self) {
		this.pocket.detail().writer({enableLoadMask:true});
	},
	exportAction3 : function(self) {
		this.pocket.detail3().writer({enableLoadMask:true});
	},
	exportAction4 : function(self) {
		this.pocket.cofm().writer({enableLoadMask:true});
	},
	exportAction5 : function(self) {
		this.pocket.cofmdetail().writer({enableLoadMask:true});
	},
	exportActions : function(self) {
		var	me = this,
			lister
		;
		switch (self.itemId) {
		case 'bf':
			lister = me.pocket.detail3_bf()
			break;
		case 'gb':
			lister = me.pocket.detail3_gb()
			break;
		case 'gl':
			lister = me.pocket.detail3_gl()
			break;
		case 'mc':
			lister = me.pocket.detail3_mc()
			break;
		case 'mf':
			lister = me.pocket.detail3_mf()
			break;
		case 'rn':
			lister = me.pocket.detail3_rn()
			break;
		case 'sf':
			lister = me.pocket.detail3_sf()
			break;
		default:
			return;
			break;
		}
		lister.writer({enableLoadMask:true});
	},

	selectAction2 : function(){
		var me              = this,
			master          = me.pocket.cofm(),
			record          = master.getSelectionModel().getSelection()[0]
			tabPanel        = me.pocket.layout().down('#cofmpanel'),
			tindex          = tabPanel.items.indexOf(tabPanel.getActiveTab()),
			cofmdetail      = me.pocket.cofmdetail(),
			search          = me.pocket.search(),
			param           = search.getValues(),
			editor          = me.pocket.editor(),
			val             = editor.getValues()
		;
		if(record){
			if(tindex==0){
				cofmdetail.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { invc_numb : record.get('invc_numb'), add:'true', bfsf_dvcd : val.bfsf_dvcd });
			}
		}else{
			Ext.Msg.alert('알림','대기내역을 선택해주세요.')
		}
	}

});
