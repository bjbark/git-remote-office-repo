Ext.define('module.custom.hantop.sale.estientry2.EstiEntry2', { extend : 'Axt.app.Controller',


	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.hntopItemModelPopup',
		'lookup.popup.view.HntopItemGroupPopup',
		'lookup.popup.view.HntopItemTypePopup',
		'lookup.popup.view.hntopItemModelPopup'
	],

	models:[
		'module.custom.hantop.sale.estientry2.model.EstiEntry2Invoice',
		'module.custom.hantop.sale.estientry2.model.EstiEntry2Master',
		'module.custom.hantop.sale.estientry2.model.EstiEntry2Detail',
		'module.custom.hantop.sale.estientry2.model.EstiEntry2Detail2',
		'module.custom.hantop.sale.estientry2.model.EstiEntry2Detail3',
		'module.custom.hantop.sale.estientry2.model.EstiEntry2WorkPopup',
		'module.custom.hantop.sale.estientry2.model.EstiEntry2EditorLister',
		'module.custom.hantop.sale.estientry2.model.EstiEntry2WorkerMtrlLister'
	],
	stores:[
		'module.custom.hantop.sale.estientry2.store.EstiEntry2Invoice',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2Master',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2Detail',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2Detail2',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2Detail3',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2WorkerLister',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2WorkerLister2',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2WorkPopup',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2WorkerListerBrand',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2EditorLister',
		'module.custom.hantop.sale.estientry2.store.EstiEntry2WorkerMtrlLister',
	],
	views : [
		'module.custom.hantop.sale.estientry2.view.EstiEntry2Layout',
		/* 현황 */
		'module.custom.hantop.sale.estientry2.view.EstiEntry2Search',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2ListerMaster',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail2',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail3',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail4',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail2Search',
		/* 작업 */
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerEditor',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerSearch',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerLister',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerLister2',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerLister3',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2Popup',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2CopyPopup',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkPopup',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkPopup2',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2AutoPopup',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2ReportPopup',
		'module.custom.hantop.sale.estientry2.view.FileUpload',
		'module.custom.hantop.sale.estientry2.view.FileUpload2',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2BomTree',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerEditorLister',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2Detail3Search',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2ListerDetail4Search',

		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerMtrlLister',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerMtrlLister2',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerMtrlLister3',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerMtrlLister4',
		'module.custom.hantop.sale.estientry2.view.EstiEntry2WorkerMtrlLister5',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-estientry2-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-estientry2-lister-master menuitem[action=closeAction]'			: { click : me.closeAction        }, /* 마감 */
			'module-estientry2-lister-master menuitem[action=closeCancelAction]'	: { click : me.closeCancelAction  }, /* 마감해지 */
			'module-estientry2-lister-master menuitem[action=cofmAction]'			: { click : me.cofmAction         }, /* 수주확정 */
			'module-estientry2-lister-master menuitem[action=cofmCancelAction]'		: { click : me.cofmCancelAction   }, /* 수주확정취소 */
			'module-estientry2-lister-master button[action=uploadAction]'			: { click : me.excelUploadAction  }, /* 엑셀업로드 */
			'module-estientry2-lister-master button[action=detailprintAction]'		: { click : me.detailprintAction  }, /* 자재소요내역집계표 */
			'module-estientry2-lister-master button[action=priceAction]'			: { click : me.priceAction        }, /* 견적금액업로드 */
			'module-estientry2-lister-master button[action=requestAction]'			: { click : me.requestAction      }, /* 시공요청서 발행 */
			'module-estientry2-lister-master button[action=workAction]'				: { click : me.workCreateAction   }, /* 소요량 계산 */
			'module-estientry2-lister-master button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-estientry2-lister-master button[action=copyAction]'				: { click : me.copyAction         }, /* 견적복사 */
			'module-estientry2-lister-master button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-estientry2-lister-master button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-estientry2-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-estientry2-lister-master button[action=estiprintAction]'		: { click : me.estiprintAction    }, /* 견적서 발행 */
			'module-estientry2-lister-detail button[action=exportAction]'			: { click : me.exportAction2      }, /* 엑셀 */
			'module-estientry2-lister-detail button[action=changeAction]'			: { click : me.changeAction       }, /* 절단방법변경 */
			'module-estientry2-lister-detail button[action=workAction2]'			: { click : me.workCreateAction2  }, /* 소요량 계산 */
			'module-estientry2-lister-detail button[action=updownAction]'			: { click : me.updownAction       }, /* ▲▼ */

			'module-estientry2-lister-detail2 button[action=exportAction]'			: { click : me.exportAction3      }, /* 엑셀 */
			'module-estientry2-lister-detail3 button[action=exportAction]'			: { click : me.exportAction5      }, /* 엑셀 */
			'module-estientry2-lister-detail4 button[action=exportAction]'			: { click : me.exportAction4      }, /* 엑셀 */

			'module-estientry2-worker-lister button[action=calAction]'				: { click : me.calAction          }, /* 계산 */
			'module-estientry2-worker-lister button[action=updateAction]'			: { click : me.updateAction       }, /* 저장 */
			'module-estientry2-worker-lister button[action=modifyAction]'			: { click : me.modifyAction2      }, /* 수정 */
			'module-estientry2-worker-lister button[action=insertAction]'			: { click : me.insertAction2      }, /* 추가 */
			'module-estientry2-worker-lister button[action=deleteAction]'			: { click : me.deleteAction2      }, /* 삭제 */
			'module-estientry2-worker-lister button[action=cancelAction]'			: { click : me.cancelAction       }, /* 취소 */
			'module-estientry2-worker-lister button[action=estiAction]'				: { click : me.estiAction         }, /* 브랜드별 견적금액 산출 */

			'module-estientry2-worker-editor button[action=changeAction]'			: { click : me.changeAction2      },

			'module-estientry2-worker-lister2 button[action=updateAction]'			: { click : me.updateAction2      }, /* 저장 */
			'module-estientry2-worker-lister2 button[action=cancelAction]'			: { click : me.cancelAction2      }, /* 취소 */
			'module-estientry2-worker-lister3 button[action=cancelAction]'			: { click : me.cancelAction3      }, /* 취소 */

			'module-estientry2-layout #detailtab'									: { tabchange : me.selectDetail },
			'module-estientry2-layout #detailtab2'									: { tabchange : me.selectDetail2 },

			'module-estientry2-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-estientry2-worker-lister' : {
				itemdblclick    : me.modifyAction2
			},
			'module-estientry2-popup #lister2' : {
				itemdblclick    : me.selectRecord2
			},
			'module-estientry2-popup #mtrlItem' : {
				tabchange : me.mtrlTabChange
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-estientry2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-estientry2-search')[0] },
		master : function () { return Ext.ComponentQuery.query('module-estientry2-lister-master')[0] },
		detail : function () { return Ext.ComponentQuery.query('module-estientry2-lister-detail')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-estientry2-lister-detail2')[0] },
		detail3 : function () { return Ext.ComponentQuery.query('module-estientry2-lister-detail3')[0] },
		detail4 : function () { return Ext.ComponentQuery.query('module-estientry2-lister-detail4')[0] },
		popup  : function () { return Ext.ComponentQuery.query('module-estientry2-popup')[0] },
		detail2search : function () { return Ext.ComponentQuery.query('module-estientry2-detail2-search')[0] },
		detail4search : function () { return Ext.ComponentQuery.query('module-estientry2-detail4-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-estientry2-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-estientry2-worker-lister')[0] },
			lister2: function () { return Ext.ComponentQuery.query('module-estientry2-worker-lister2')[0] },
			lister3: function () { return Ext.ComponentQuery.query('module-estientry2-worker-lister3')[0] },
			search : function () { return Ext.ComponentQuery.query('module-estientry2-worker-search')[0] },
			search2: function () { return Ext.ComponentQuery.query('module-estientry2-detail3-search')[0] },
			editorlister : function () { return Ext.ComponentQuery.query('module-estimast2-worker-editor-lister')[0] },
			mtrllister   : function () { return Ext.ComponentQuery.query('module-estientry2-mtrl-lister')[0] },
			mtrllister2  : function () { return Ext.ComponentQuery.query('module-estientry2-mtrl-lister2')[0] },
			mtrllister3  : function () { return Ext.ComponentQuery.query('module-estientry2-mtrl-lister3')[0] },
			mtrllister4  : function () { return Ext.ComponentQuery.query('module-estientry2-mtrl-lister4')[0] },
			mtrllister5  : function () { return Ext.ComponentQuery.query('module-estientry2-mtrl-lister5')[0] }
		},
	},

	//조회
	selectAction:function() {
		var me = this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.master(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},

	//선택
	selectDetail:function( grid, record ){
		var me = this,
			tpanel = me.pocket.layout().down('#detailtab'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined,
			master  = me.pocket.master(),
			detail  = me.pocket.detail(),
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4(),
			records = detail.getSelectionModel().getSelection(),
			record  = master.getSelectionModel().getSelection()[0],
			record2 = detail.getSelectionModel().getSelection()[0],
			search  = me.pocket.detail4search()
		;
		if(record==null){
			return;
		}
		if(tindex == 1){
			detail3.select({
				callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
			}, { invc_numb : record.get('invc_numb')});
		}else if(tindex == 2){
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "견적품목을 선택 후 진행하십시오.");
				tpanel.items.indexOf(tpanel.setActiveTab(0));
				return;
			}
			search.loadRecord(record2);
			detail4.select({
				callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
			}, { invc_numb : record.get('invc_numb'), brnd_bacd : record2.get('brnd_bacd'), line_seqn : record2.get('line_seqn') });
		}else if(tindex == 3){
			if (!records || records.length!=1) {
				Ext.Msg.alert("알림", "견적품목을 선택 후 진행하십시오.");
				tpanel.items.indexOf(tpanel.setActiveTab(0));
				return;
			}

			detail2.select({
				callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
			}, { acpt_numb : record.get('invc_numb') , acpt_seqn : record2.get('line_seqn')});
		}
	},

	selectDetail2:function( grid, record ){
		var me = this,
			tpanel = me.pocket.layout().down('#detailtab2'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			master  = me.pocket.master(),
			mrec    = master.getSelectionModel().getSelection()[0],
			lister  = me.pocket.worker.lister(),
			rec     = lister.getSelectionModel().getSelection()[0],
			lister2 = me.pocket.worker.lister2(),
			lister3 = me.pocket.worker.lister3(),
			search  = me.pocket.worker.search2(),
			editor	= me.pocket.worker.editor()
		;
		if(tindex == 1){
			lister2.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { invc_numb : editor.down('[name=invc_numb]').getValue()});
		}else if(tindex == 2){
			if(rec == null){
				Ext.Msg.alert("알림", "견적품목을 선택 후 진행하십시오.");
				tpanel.items.indexOf(tpanel.setActiveTab(0));
				return;
			}else{
				search.loadRecord(rec);
				search.loadRecord(mrec);

				lister3.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { invc_numb : rec.get('invc_numb'), line_seqn : rec.get('line_seqn')});
			}
		}
	},

	selectRecord:function( grid, record ){
		var me = this,
			detail = me.pocket.detail(),
			detail2 = me.pocket.detail2(),
			tpanel = me.pocket.layout().down('#detailtab'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
			records = detail.getSelectionModel().getSelection();
		;
		if (record.length > 0) {
			tpanel.items.indexOf(tpanel.setActiveTab(0));
			Ext.ComponentQuery.query('module-estientry2-detail2-search')[0].down('[name=add]').setValue('false');
			detail.select({
				callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
			}, { invc_numb : record[0].data.invc_numb} );
		}
	},

	selectRecord2 : function(grid, record){
		var me = this,
			popup = me.pocket.popup(),
			lister1 = me.pocket.worker.mtrllister(),
			lister2 = me.pocket.worker.mtrllister2(),
			lister3 = me.pocket.worker.mtrllister3(),
			lister4 = me.pocket.worker.mtrllister4(),
			lister5 = me.pocket.worker.mtrllister5(),
			editor  = me.pocket.worker.editor(),
			values	= editor.getValues(),
			tabpanel= popup.down('[itemId=mtrlItem]'),
			active	= tabpanel.getActiveTab(),
			index	= tabpanel.items.indexOf(active),
			westGrid= popup.down('grid'),
			select  = westGrid.getSelectionModel().getSelection()[0],
			lister
		;
		console.log('0'+index);
		if(index==0){
			lister = lister1;
		}else if(index==1){
			lister = lister2;
		}else if(index==2){
			lister = lister3;
		}else if(index==3){
			lister = lister4;
		}else if(index==4){
			lister = lister5;
		}
		lister.getStore().load({
			params	: {
				param:JSON.stringify({
					invc_numb : values.invc_numb,
					line_seqn : select.get('line_seqn'),
					brnd_bacd : '0'+(index+1),
					all       : lister.down('[name=bfsf_dvcd]').getValue(),
					bf        : lister.down('[name=bfsf_dvcd1]').getValue(),
					sf        : lister.down('[name=bfsf_dvcd2]').getValue(),
					mf        : lister.down('[name=bfsf_dvcd3]').getValue(),
				})}, scope:this,
			callback:function(records, operation, success) {
			}
		});
		popup.down('form').loadRecord(record);
		popup.popup.params = { stor_grp : _global.stor_grp, record : record};

	},


	//추가
	insertAction:function() {
		var me		= this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister(),
			search	= me.pocket.worker.search()
		;
		editor.getForm().reset();
		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'westi_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						action	: 'invoice',
						caller	: me,
						record	: Ext.create( me.models[0] ,{
							invc_numb	: keygen.records[0].seq
						}),
						lister		: me.pocket.worker.lister(),
						callback	: function (results){
							console.log(results);
							if  (results.success){
								me.pocket.layout().getLayout().setActiveItem(1);
								results.feedback({success : true , visible : true });
							}
						}
					});
				}
			}
		});
	},

	//수정
	modifyAction:function() {
		var me = this,
			select = me.pocket.master().getSelectionModel().getSelection(),
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			search = me.pocket.worker.search(),
			editorlister = me.pocket.worker.editorlister(),
			err_msg = "", count = 0, count2 = 0, count3 = 0, cmpl_dvcd, amnt = 0
		;

		if (select.length > 0){
			Ext.each(select, function(record) {
				if(record.get("line_clos") == "1") {
					err_msg = "마감된 견적입니다.";
				}
				if(record.get('pror_yorn') == "1"){
					count2++;
				}
				if(record.get('cmpl_dvcd') != "1"){
					cmpl_dvcd = record.get('cmpl_dvcd');
					count3++;
				}
				if(record.get('cofm_yorn') == "1"){
					count++;
				}
			});

		if(count > 0 || count2 > 0 || count3 > 0){
			var prod = "";
			if(cmpl_dvcd=='2'){
				prod = '진행중';
			}else if(cmpl_dvcd=='3'){
				prod = '완료';
			}
			if(select.length == 1){
				if(count  > 0) err_msg = "수주확정되어 수정할 수 없습니다.";
				else if(count2 > 0) err_msg = "지시확정되어 수정할 수 없습니다.";
				else if(count3 > 0) err_msg = "진행상태가"+prod+"인 건은 수정할 수 없습니다.";
			}else{
				if(count  > 0) err_msg = "수주확정된 건이 포함되어 있습니다.";
				else if(count2 > 0) err_msg = "지시확정된 건이 포함되어 있습니다.";
				else if(count3 > 0) err_msg = "진행상태가"+prod+"인 건이 포함되어 있습니다.";
			}
		}

		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}
			editorlister.select({
				callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
			}, { invc_numb : select[0].get('invc_numb')});

			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({ invc_numb : select[0].get('invc_numb') })},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						editor.down('[name=bsmt_loss_rate]').setValue(results.records[0].data.bsmt_loss_rate);
						editor.down('[name=asmt_loss_rate]').setValue(results.records[0].data.asmt_loss_rate);
						editor.down('[name=weld_loss_rate]').setValue(results.records[0].data.weld_loss_rate);
						editor.down('[name=rein_viss_itvl]').setValue(results.records[0].data.rein_viss_itvl);
						editor.down('[name=ancr_atch_itvl]').setValue(results.records[0].data.ancr_atch_itvl);
						me.pocket.layout().getLayout().setActiveItem(1);
						results.feedback( {success : true } );
					}

					//견적금액 조회
					for (var i = 0; i < lister.getStore().data.items.length; i++) {
						amnt += lister.getStore().data.items[i].data.invc_amnt;
					}
					editor.down('[name=esti_amnt]').setValue(amnt);
				}
			}, me);



		}else{
			Ext.Msg.alert("알림", "변경할 내역을 선택해주십시오.");
			return;
		}
	},
	updownAction:function(comp){
		var	me		= this,
			master	= me.pocket.master(),
			detail	= me.pocket.detail(),
			masterSelect = master.getSelectionModel().getSelection()[0],
			select	= detail.getSelectionModel().getSelection()[0],
			dvcd	= '0', chk = 0
		;
		if(masterSelect){
			if(masterSelect.get('cofm_yorn')!='1'){
				if(select){
					var max_seq = select.get('line_seqn')
					detail.getStore().each(function(findrecord) {
						if(max_seq < findrecord.get('line_seqn')) {
							max_seq = findrecord.get('line_seqn');
						}
					});

					if(comp.itemId == 'up'){
						dvcd = '1';
					}
					if(max_seq ==  select.get('line_seqn') && dvcd == '0' ){
						Ext.Msg.alert('알림','가장 높은 순번입니다.');
						return;
					}

					if(select.get('line_seqn')== 1 && dvcd == '1'){
						Ext.Msg.alert('알림','가장 낮은 순번입니다.');
						return;
					}

					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
					mask.show();
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/updown.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id		: _global.stor_id,
								invc_numb	: select.get('invc_numb'),
								line_seqn	: select.get('line_seqn'),
								dvcd		: dvcd
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
								detail.getStore().reload({
									callback:function(){
										var index = 0;
										if(dvcd == 0 ){
											index = (select.get('line_seqn')-1)+1;
										}else{
											index = (select.get('line_seqn')-1)-1;
										}
										detail.getSelectionModel().select(index);
									}
								});
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
						}
					});
				}
			}else{
				Ext.Msg.alert('알림','수주확정된 견적은 순서를 변경할 수 없습니다.')
			}
		}
	},

	//저장
	updateAction2:function() {
		var me = this,
			tpanel = me.pocket.layout().down('#detailtab2'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			master	= me.pocket.master(),
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister2(),
			store	= lister.getStore(),
			changes = lister.getStore().getUpdatedRecords().length,
			values	= editor.getValues()
		;

		for (var a = 0; a < changes; a++) {
			lister.getStore().getUpdatedRecords()[a].data.invc_numb = values.invc_numb;
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		lister.getStore().sync({
			success : function(operation){
				me.pocket.layout().getLayout().setActiveItem(0);
				tpanel.items.indexOf(tpanel.setActiveTab(0));
				master.getStore().reload();
				store.clearData();
				store.removeAll();
			},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
			}
		});
	},


	//저장
	updateAction:function() {
		var me = this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister(),
			search	= me.pocket.worker.search(),
			master	= me.pocket.master(),
			detail	= me.pocket.detail(),
			store	= master.getStore(),
			store2	= editor.getStore(),
			store3	= lister.getStore(),
			values	= editor.getValues()
		;

		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				record.data.bsmt_loss_rate = Number(values.bsmt_loss_rate);
				record.data.asmt_loss_rate = Number(values.asmt_loss_rate);
				record.data.weld_loss_rate = Number(values.weld_loss_rate);
				record.data.rein_viss_itvl = Number(values.rein_viss_itvl);
				record.data.ancr_atch_itvl = Number(values.ancr_atch_itvl);

				if (results.success) {
					var info	= record,
						dirty	= false
					;
					var items	= info.product().data.items;

					info.dirtyValue('sysm_memo', '');
					info.product().data.each( function( item ) {
						item.dirtyValue('invc_numb', info.get('invc_numb'));
						if (item.dirty || item.phantom) {
							dirty = true;
						}
						if(item.data.invc_qntt == 0){
							store3.remove(item);
						}
					});
					if (dirty) {
						info.setDirty();
					}
					results.feedback({success : true  });
				}
			},

			callback : function(results, record, store ) {
				if (results.success){
					store.sync({
						success : function(records, operation){
							var ms;
							if (results.inserted){
								ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, ms);
							} else {
								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));
								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();
							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
							master.select({
								 callback:function(records, operation, success) {
									if (success) {
										master.getSelectionModel().select(0);
									} else { me.pocket.editor().getForm().reset(true); }
								}, scope:me
							}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

						}, /* 저장 성공시 */
						failure : function(operation){
							results.feedback({success : false });
							master.getStore.reload();
						},
						callback: function(operation){ results.callback({}); }
					});
				}
			}
		});
	},

	//삭제
	deleteAction:function() {
		var me = this,
			master = me.pocket.master(),
			store  = master.getStore(),
			count  = 0
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (records.length <= 0) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (records.length > 0){
			Ext.each(records, function(record) {
				if(record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}
				if(record.get('cofm_yorn') == "1"){
					count++;
				}
			});

			if(count > 0){
				if(records.length == 1){
					err_msg = "수주확정되어 삭제할 수 없습니다.";
				}else{
					err_msg = "수주확정된 건이 포함되어 있습니다.";
				}

				if (err_msg != "") {
					Ext.Msg.alert("알림", err_msg);
					return;
				}
			}
		}

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/hntop/sale/estientry2/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb')
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
						master.getStore().reload();
						mask.hide();
						me.pocket.lister.detail().getStore().loadData([],false);
					}
				});
			}
		});
	},

	//취소
	cancelAction:function() {
		var me = this,
		editor = me.pocket.worker.editor(),
		lister = me.pocket.worker.lister2(),
		store  = lister.getStore()
		;
		editor.cancelRecord({
			action		: 'invoice',
			caller		: me,
			callback	: function( results ) {
				if (results.success){
					me.pocket.layout().getLayout().setActiveItem(0);
					results.feedback( {success : true});
				}
			}
		});

		store.clearData();
		store.removeAll();

	},

	//취소
	cancelAction2:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister2(),
			store  = lister.getStore(),
			tpanel = me.pocket.layout().down('#detailtab2')
		;
		editor.cancelRecord({
			action		: 'invoice',
			caller		: me,
			callback	: function( results ) {
				if (results.success){
					me.pocket.layout().getLayout().setActiveItem(0);
					results.feedback( {success : true});
				}
			}
		});

		tpanel.items.indexOf(tpanel.setActiveTab(0));
		store.clearData();
		store.removeAll();

	},

	//취소
	cancelAction3:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister3(),
			store  = lister.getStore(),
			tpanel = me.pocket.layout().down('#detailtab2'),
			search  = me.pocket.worker.search2()
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));
		me.pocket.layout().getLayout().setActiveItem(0);
		search.getForm().reset();

		store.clearData();
		store.removeAll();

	},

	// 견적서 발행.
	estiprintAction : function(grid,record){
		var	me = this,
			master			= me.pocket.master(),
			masterRecord	= master.getSelectionModel().getSelection()[0]
		;
		if(masterRecord){
			resource.loadPopup({
				widget : 'module-estientry2-report-popup',
			});
		}else{
			Ext.Msg.alert('알림','견적을 선택해주세요.')
		}
	},

	//견적복사
	copyAction:function() {
		var me = this,
			lister = me.pocket.master()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}
		var me = this
		resource.loadPopup({
			widget : 'module-estientry2-copy-popup',
			params : {
				invc_numb : records[0].get('invc_numb'),
				cstm_name : records[0].get('cstm_name'),
				cstm_idcd : records[0].get('cstm_idcd'),
			},
		});
	},

	//견적등록 추가 버튼
	insertAction2:function(){
		var me = this
		;
		resource.loadPopup({
			widget : 'module-estientry2-popup',
		});
	},

	//견적등록 수정 버튼
	modifyAction2:function(){
		var me = this,
			select	= me.pocket.worker.lister().getSelectionModel().getSelection()[0]
		;

		if(select){
			resource.loadPopup({
				widget : 'module-estientry2-popup',
				params	: {
					record : select
				},
			});
		}else{
			Ext.Msg.alert("알림", "수정하려는 1건을 선택 해주십시오.");
			return;
		}
	},

	//견적등록 삭제 버튼
	deleteAction2:function(){
		var me = this,
			lister	= me.pocket.worker.lister(),
			select	= lister.getSelectionModel().getSelection()[0],
			store	= lister.getStore()
		;

		if(select){
			store.remove(select);

			Ext.ComponentQuery.query('module-estientry2-worker-editor')[0].down('[name=change]').setValue('Y');
		}else{
			Ext.Msg.alert("알림", "삭제하려는 1건을 선택해주십시오.");
			return;
		}
	},

	// 시공요청서 발행.
	requestAction : function() {
		var me = this,
		lister = me.pocket.master(),
		select = me.pocket.master().getSelectionModel().getSelection(),
		jrf = 'hntop_request.jrf',
		resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
		if (!records || records.length<1) {
			Ext.Msg.alert("알림", "견적을 선택하여주십시오.");
			return;
		}else if(records.length > 1){
			Ext.Msg.alert("알림", "하나의 견적만 선택하여주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg =	'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},

	//자재소요내역집계표 발행.
	detailprintAction : function() {
		var me = this,
		lister = me.pocket.master(),
		select = me.pocket.master().getSelectionModel().getSelection(),
		jrf = 'hntop_Required_mtrl.jrf',
		resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
		if (!records || records.length<1) {
			Ext.Msg.alert("알림", "견적을 선택하여주십시오.");
			return;
		}else if(records.length > 1){
			Ext.Msg.alert("알림", "하나의 견적만 선택하여주십시오.");
			return;
		}
		if (select) {
			var invc_numb = select[0].get('invc_numb');
			var arg =	'invc_numb~'+invc_numb+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800'),
			});
		}
	},


	//소요량계산
	workCreateAction:function() {
		var me = this,
			select = me.pocket.master().getSelectionModel().getSelection()[0],
			lister = me.pocket.worker.lister(),
			count  = 0,pror_cnt=0,cofm_cnt=0,
			msg    = ''
		;
		console.log(select);
		if(select.length <= 0){
			Ext.Msg.alert("알림","소요량 계산하려는 견적을 선택해주십시오.");
		}else if(select.length > 1){
			Ext.Msg.alert("알림", "하나의 견적만 선택하여주십시오.");
			return;
		}else{
			Ext.each(select, function(record) {
				if (record.get("work_indn_yorn") == "1") {
					count++;
				}
				if(record.get('cofm_yorn')=="0"){
					console.log(record.get('cofm_yorn'));
					cofm_cnt++;
				}
				if(record.get('pror_yorn')=="1"){
					pror_cnt++;
				}
			});
			if(count=='0'&&pror_cnt=='0'&&cofm_cnt=='0'){
				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/allCal.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							invc_numb	: select.data.invc_numb
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
							Ext.Msg.alert("알림", "계산이 완료되었습니다.");
							return;
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
//				resource.loadPopup({
//					widget : 'module-estientry2-work-popup',
//				});
			}else{
				if(pror_cnt > 0 ){
					if(select.length == 1){
						Ext.Msg.alert('알림',"지시 확정된 견적은 소요량 계산을 진행 할 수 없습니다.");
						return;
					}else{
						Ext.Msg.alert('알림',"지시 확정된 견적이 있습니다. 지시확정된 견적은 소요량 계산을 진행 할 수 없습니다.");
						return;
					}
				}
				if(count > 0){
					if(select.length == 1){
						msg = "이미 소요량 계산된 견적입니다. 진행하시겠습니까?";
					}else{
						msg = "이미 소요량 계산된 건이 포함되어 있습니다. 진행하시겠습니까?";
					}
				}
				if(msg!=''){
					Ext.Msg.show({ title: '확인', msg: msg, icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
						fn: function (button) {
							if (button=='yes') {
								Ext.Ajax.request({
									url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/allCal.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											invc_numb	: select[0].data.invc_numb
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
											Ext.Msg.alert("알림", "계산이 완료되었습니다.");
											return;
										}
									},
									failure : function(result, request) {
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
//								resource.loadPopup({
//									widget : 'module-estientry2-work-popup',
//								});
							}
						}
					});
				}
			}
		}
	},

	//소요량계산 detail 한 품목당.
	workCreateAction2:function() {
		var me = this,
			select = me.pocket.detail().getSelectionModel().getSelection(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.master(),
			detail = me.pocket.detail()
		;
		var record = master.getSelectionModel().getSelection();
		var records = detail.getSelectionModel().getSelection()[0];

		if(select.length != 0){
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/itemCal.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb	: records.get('invc_numb'),
						line_seqn	: records.get('line_seqn')
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
						Ext.Msg.alert("알림", "계산이 완료되었습니다.");
						return;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}else{
			Ext.Msg.alert("알림", "계산할 견적 품목을 추가해주십시오.");
			return;
		}
//		if(select.length <= 0){
//			Ext.Msg.alert("알림","소요량 계산하려는 견적의 품목을 선택해주십시오.");
//		}else{
//			resource.loadPopup({
//				widget : 'module-estientry2-work-popup2'
//			});
//			var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(record[0].data.invc_numb);
//			var numb2 = Ext.ComponentQuery.query('#line_seqn')[0].setValue(records[0].data.line_seqn);
//		}
	},

	//엑셀 업로드
	excelUploadAction : function () {
		var me = this,
		param  = me.pocket.search().getValues(),
		lister	= me.pocket.master(),
		new_invc_numb
		;
		Ext.Ajax.request({
			url : _global.location.http() + '/listener/seq/maxid.do',
			object		: resource.keygen,
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'excel_upload'
				})
			},
			async	: false,
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				new_invc_numb = result.records[0].seq;
			}
		});
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-estientry2-upload',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: 'resource/sample/견적서 양식.xlsx'
			},
			apiurl : {
				upload : _global.location.href + '/system/custom/hntop/sale/estientry2/set/excel.do', // url (필수)
			},

			params : {
				stor_id	: _global.stor_id,
				table_nm: 'excel_upload',
				invc_numb: new_invc_numb
			},
			title			: '엑셀 Upload',					// popup title (옵션)
			waitMsg			: '업로드중...',					// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],				// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {								// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					lister.getStore().reload();
				}
			}
		});
		Ext.ComponentQuery.query('#invc_numb')[0].setValue(new_invc_numb);
	},

	//견적금액 업로드
	priceAction : function () {
		var me = this,
		param  = me.pocket.search().getValues(),
		lister	= me.pocket.master(),
		new_invc_numb
		;
		Ext.Ajax.request({
			url : _global.location.http() + '/listener/seq/maxid.do',
			object		: resource.keygen,
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'excel_upload'
				})
			},
			async	: false,
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				new_invc_numb = result.records[0].seq;
			}
		});
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-estientry2-upload2',
			sample : {
				xtype	: 'button' ,
				text	: '엑셀양식 받기' ,
				iconCls	: Const.FINISH.icon ,
				href	: ''
			},
			apiurl : {
				upload : _global.location.href + '/system/custom/hntop/sale/estientry2/set/excel2.do', // url (필수)
			},

			params : {
				stor_id	: _global.stor_id,
				table_nm: 'excel_upload',
				invc_numb: new_invc_numb
			},
			title			: '엑셀 Upload',					// popup title (옵션)
			waitMsg			: '업로드중...',					// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],				// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {								// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					lister.getStore().reload();
				}
			}
		});
		Ext.ComponentQuery.query('#invc_numb')[0].setValue(new_invc_numb);
	},

	//마감
	closeAction:function() {
		var me = this,
			master = me.pocket.master(),
			select = master.getSelectionModel().getSelection()
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "이미 마감되었습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감할 견적을 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '1',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'westi_mast'
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
										master.getStore().reload();
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},


	//마감해지
	closeCancelAction:function() {
		var me = this,
			master = me.pocket.master(),
			select = master.getSelectionModel().getSelection()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("line_clos") != "1") {
					err_msg = "마감해지할 수 없는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 해지할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 마감해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/close.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										line_clos		: '0',
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										table			: 'westi_mast'
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
										master.getStore().reload();
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},

	//수주확정
	cofmAction:function() {
		var me = this,
		master = me.pocket.master(),
		select = master.getSelectionModel().getSelection(),
		count  = 0
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("cofm_yorn") == "1") {
					count++;
				}
			});

			if(count > 0){
				if(select.length == 1){
					err_msg = "이미 확정되었습니다.";
				}else{
					err_msg = "이미 확정된 건이 포함되어 있습니다.";
				}
			}

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}



		} else {
			Ext.Msg.alert("알림", "수주확정할 견적을 선택하여 주시기 바랍니다.");
			return;
		}
		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 확정하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/cofm.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										amnd_degr		: record.get('amnd_degr'),
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										login_id		: _global.login_pk,
										cofm_yorn		: '1',
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
										master.getStore().reload();
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},


	//수주확정취소
	cofmCancelAction:function() {
		var me = this,
		master = me.pocket.master(),
		store  = master.getStore(),
		select = master.getSelectionModel().getSelection(),
		count  = 0
		;
		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (record.get("cofm_yorn") != "1") {
					err_msg = "견적번호 [ <span style='color:red;'>"+record.get('invc_numb')+"</span> ]</br> 확정되지 않은 견적은 확정 취소할 수 없습니다.";
					return false;
				}
				if (record.get("cmpl_dvcd") > "1") {
					err_msg = "견적번호 [ <span style='color:red;'>"+record.get('invc_numb')+"</span> ]</br> 작업 진행중인 견적은 확정 취소할 수 없습니다."
					return false;
				}
				if (record.get("pror_yorn") != "0") {
					err_msg = "견적번호 [ <span style='color:red;'>"+record.get('invc_numb')+"</span> ]</br> 지시확정된 견적은 확정 취소할 수 없습니다."
					return false;
				}
			});
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "마감 해지할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
			Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 확정취소하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						Ext.each(select, function(record) {
							Ext.Ajax.request({
								url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/cofmcancel.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										invc_numb		: record.get('invc_numb'),
										amnd_degr		: record.get('amnd_degr'),
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										login_id		: _global.login_pk,
										cofm_yorn		: '0',
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
										master.getStore().reload();
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
						})
					}
				}
			});
		}
	},

	//계산
	calAction : function() {
		var me = this,
			lister = me.pocket.worker.lister(),
			store  = lister.getStore(),
			editor = me.pocket.worker.editor(),
			values = editor.getValues(),
			select = lister.getSelectionModel().getSelection()[0],
			amnt = 0
		;

		if(select.length != 0){
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/itemCal.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb	: values.invc_numb,
						line_seqn	: select.get('line_seqn')
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
						Ext.Msg.alert("알림", "계산이 완료되었습니다.");
						return;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});

			//견적금액 reload
			for (var i = 0; i < lister.getStore().data.items.length; i++) {
				amnt += lister.getStore().data.items[i].data.invc_amnt;
			}
			editor.down('[name=esti_amnt]').setValue(amnt);


		}else{
			Ext.Msg.alert("알림", "계산할 견적 품목을 추가해주십시오.");
			return;
		}

	},

	//절단방법변경
	changeAction : function() {
		var me = this,
			master = me.pocket.master().getSelectionModel().getSelection(),
			select = me.pocket.detail().getSelectionModel().getSelection(),
			pror_yorn = master[0].data.pror_yorn,
			cofm_yorn = master[0].data.cofm_yorn
		;
		if(select && select.length != 0){
			if(pror_yorn == '1'){
				Ext.Msg.alert("알림", "지시확정된 견적은 변경할 수 없습니다.");
				return;
			}
			if(cofm_yorn == '0'){
				Ext.Msg.alert("알림", "수주확정된 견적을 선택해주십시오.");
				return;
			}
			resource.loadPopup({
				widget : 'module-estientry2-auto-popup',
				params : {
					stor_id	: _global.stor_id,
					invc_numb: select[0].data.invc_numb,
					line_seqn: select[0].data.line_seqn,
					amnd_degr: select[0].data.amnd_degr
				},
			});
		}else{
			Ext.Msg.alert("알림", "변경할 견적 품목을 선택해주십시오.");
			return;
		}
	},

	changeAction2 : function(){
		var me = this,
			lister = me.pocket.worker.lister(),
			store  = lister.getStore(),
			length = store.data.items.length,
			editor = me.pocket.worker.editor(),
			brnd_name, brnd_idcd
		;

		if(length > 0){
			brnd_name = editor.down('[name=base_name2]').getValue();
			brnd_idcd = editor.down('[name=brnd_bacd2]').getValue();

			store.each(function(record) {
				record.set("base_name", brnd_name);
				record.set("brnd_bacd", brnd_idcd);
			});

		}
	},

	mtrlTabChange : function(tabPanel, newCard, oldCard){
		var me			= this,
			tindex		= tabPanel.items.indexOf(tabPanel.getActiveTab()),
			lister		= me.pocket.worker.mtrllister(),
			lister2		= me.pocket.worker.mtrllister2(),
			lister3		= me.pocket.worker.mtrllister3(),
			lister4		= me.pocket.worker.mtrllister4(),
			lister5		= me.pocket.worker.mtrllister5(),
			editor		= me.pocket.worker.editor(),
			invc		= editor.down('[name=invc_numb]').getValue(),
			mtrl		= me.pocket.worker.mtrllister(),
			mtrl2		= me.pocket.worker.mtrllister2(),
			mtrl3		= me.pocket.worker.mtrllister3(),
			mtrl4		= me.pocket.worker.mtrllister4(),
			mtrl5		= me.pocket.worker.mtrllister5()
		;
		if(invc != ''){
			if(tindex == 0){
				lister.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { invc_numb : invc , brnd_bacd : '01',
					 all : mtrl.down('[name=bfsf_dvcd]').getValue(),
					 bf  : mtrl.down('[name=bfsf_dvcd1]').getValue(),
					 sf  : mtrl.down('[name=bfsf_dvcd2]').getValue(),
					 mf  : mtrl.down('[name=bfsf_dvcd3]').getValue()
				});
			}else if(tindex == 1){
				lister2.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { invc_numb : invc , brnd_bacd : '02',
					 all : mtrl2.down('[name=bfsf_dvcd]').getValue(),
					 bf  : mtrl2.down('[name=bfsf_dvcd1]').getValue(),
					 sf  : mtrl2.down('[name=bfsf_dvcd2]').getValue(),
					 mf  : mtrl2.down('[name=bfsf_dvcd3]').getValue()
				});
			}else if(tindex == 2){
				lister3.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { invc_numb : invc , brnd_bacd : '03',
					 all : mtrl3.down('[name=bfsf_dvcd]').getValue(),
					 bf  : mtrl3.down('[name=bfsf_dvcd1]').getValue(),
					 sf  : mtrl3.down('[name=bfsf_dvcd2]').getValue(),
					 mf  : mtrl3.down('[name=bfsf_dvcd3]').getValue()
				});
			}else if(tindex == 3){
				lister4.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { invc_numb : invc , brnd_bacd : '04',
					 all : mtrl4.down('[name=bfsf_dvcd]').getValue(),
					 bf  : mtrl4.down('[name=bfsf_dvcd1]').getValue(),
					 sf  : mtrl4.down('[name=bfsf_dvcd2]').getValue(),
					 mf  : mtrl4.down('[name=bfsf_dvcd3]').getValue()
				});
			}else if(tindex == 4){
				lister5.select({
					callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
				}, { invc_numb : invc , brnd_bacd : '05',
					 all : mtrl5.down('[name=bfsf_dvcd]').getValue(),
					 bf  : mtrl5.down('[name=bfsf_dvcd1]').getValue(),
					 sf  : mtrl5.down('[name=bfsf_dvcd2]').getValue(),
					 mf  : mtrl5.down('[name=bfsf_dvcd3]').getValue()
				});
			}
		}
	},


	//브랜드별 견적금액 산출
	estiAction : function(){
		var me = this,
			lister = me.pocket.worker.lister(),
			store  = lister.getStore()
		;
		if(store.data.items.length > 0){
			console.log(store.data.items[0].data.invc_numb);
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hntop/sale/estientry2/set/esti.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb	: store.data.items[0].data.invc_numb
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
						Ext.Msg.alert("알림", "브랜드별 견적금액 산출이 완료되었습니다.");
						return;
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
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
		this.pocket.detail2().writer({enableLoadMask:true});
	},

	exportAction4 : function(self) {
		this.pocket.detail4().writer({enableLoadMask:true});
	},

	exportAction5 : function(self) {
		this.pocket.detail3().writer({enableLoadMask:true});
	},

});
