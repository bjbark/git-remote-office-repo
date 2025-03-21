Ext.define('module.custom.kortc.sale.order.sordermast.SorderMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.ItemPopupKortc'
	],

	models:[
		'module.custom.kortc.sale.order.sordermast.model.SorderMastInvoice',
		'module.custom.kortc.sale.order.sordermast.model.SorderMastMaster',
		'module.custom.kortc.sale.order.sordermast.model.SorderMastDetail',
		'module.custom.kortc.sale.order.sordermast.model.SorderMastDetail4',
		'module.custom.kortc.sale.order.sordermast.model.SorderMastFile'
	],
	stores:[
		'module.custom.kortc.sale.order.sordermast.store.SorderMastInvoice',
		'module.custom.kortc.sale.order.sordermast.store.SorderMastMaster',
		'module.custom.kortc.sale.order.sordermast.store.SorderMastMaster2',
		'module.custom.kortc.sale.order.sordermast.store.SorderMastDetail',
		'module.custom.kortc.sale.order.sordermast.store.SorderMastDetail2',
		'module.custom.kortc.sale.order.sordermast.store.SorderMastDetail3',
		'module.custom.kortc.sale.order.sordermast.store.SorderMastDetail4',
		'module.custom.kortc.sale.order.sordermast.store.SorderMastUpload',
		'module.custom.kortc.sale.order.sordermast.store.SorderMastFile'
	],
	views : [
		'module.custom.kortc.sale.order.sordermast.view.SorderMastLayout',
		/* 현황 */
		'module.custom.kortc.sale.order.sordermast.view.SorderMastSearch',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastListerMaster',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastListerMaster2',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastListerDetail',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastListerDetail2',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastListerDetail3',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastListerDetail4',
		/* 작업 */
		'module.custom.kortc.sale.order.sordermast.view.SorderMastWorkerEditor',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastWorkerSearch',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastWorkerLister',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastAmendPopup',
		'module.custom.kortc.sale.order.sordermast.view.SorderMastCopyPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-sordermast-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sordermast-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sordermast-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sordermast-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-sordermast-lister-master2 button[action=amendAction]'			: { click : me.amendAction        }, /* Amend */
			'module-sordermast-lister-master2 button[action=copyAction]'			: { click : me.copyAction         }, /* 주문복사 */
			'module-sordermast-lister-master2 button[action=orderAction]'			: { click : me.orderAction        }, /* 견적등록 */
			'module-sordermast-lister-master2 button[action=insertAction]'			: { click : me.insertAction       }, /* 등록 */
			'module-sordermast-lister-master2 button[action=modifyAction]'			: { click : me.modifyAction       }, /* 수정 */
			'module-sordermast-lister-master2 button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */
			'module-sordermast-lister-master2 button[action=deleteAction]'			: { click : me.deleteAction       }, /* 삭제 */
			'module-sordermast-lister-detail button[action=exportAction]'			: { click : me.exportDetailAction }, /* 엑셀 */
			'module-sordermast-lister-master2 button[action=printAction]'			: { click : me.printAction        }, /* 견적서발행 */

			'module-sordermast-lister-master2 button[action=uploadAction]'			: { click : me.excelUploadAction },
			'module-sordermast-lister-master2 button[action=pasteUploadAction]'		: { click : me.pasteUploadAction }, /* 엑셀 붙여 넣기 액션 */

			'module-sordermast-lister-detail3 button[action=updateAction]'			: { click : me.imgUpdateAction }, /*이미지 저장 */
			'module-sordermast-lister-detail3 button[action=cancelAction]'			: { click : me.imgCancelAction }, /*이미지 저장 취소 */


			'module-sordermast-worker-lister button[action=deleteAction]'			: { click : me.deleteAction2       }, /* 디테일삭제 */

			'module-sordermast-worker-lister button[action=updateAction]'			: { click : me.updateAction }, /* 저장 */
			'module-sordermast-worker-lister button[action=cancelAction]'			: { click : me.cancelAction }, /* 취소 */

			'module-sordermast-lister-detail4 button[action=updateAction]'			: { click : me.updateAction4 }, /* 저장 */
			'module-sordermast-lister-detail4 button[action=cancelAction]'			: { click : me.cancelAction4 }, /* 취소 */


			'module-sordermast-lister-master' : {
				itemclick		: me.selectDetail,
				selectionchange : me.selectRecord
			},

			'module-sordermast-lister-master2' : {
				 itemclick    : me.selectDetail2,
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sordermast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sordermast-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-sordermast-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-sordermast-worker-lister')[0] }
		},
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-sordermast-lister-master')[0] },
			master2  : function () { return Ext.ComponentQuery.query('module-sordermast-lister-master2')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-sordermast-lister-detail')[0] },
			detail2  : function () { return Ext.ComponentQuery.query('module-sordermast-lister-detail2')[0] },
			detail3  : function () { return Ext.ComponentQuery.query('module-sordermast-lister-detail3')[0] },
			detail4  : function () { return Ext.ComponentQuery.query('module-sordermast-lister-detail4')[0] }
		},
		popup   : function () { return Ext.ComponentQuery.query('module-sordermast-copy-popup')[0] }
	},

	selectAction:function(callbackFn) {
		var me = this,
			editor	= this.pocket.worker.editor(),
			lister	= me.pocket.lister.master(),
			master2	= me.pocket.lister.master2(),
			search	= me.pocket.search(),
			param	= search.getValues(),
			layout	= me.pocket.layout(),
			imge = layout.down('#imgTab'),
			tabPanel   = me.pocket.layout().down('#detail'),
			tindex= tabPanel.items.indexOf(tabPanel.getActiveTab())
		;
		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
						master2.getStore().clearData();
						master2.getStore().loadData([],false);
					} else { }
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
			tabPanel.setActiveTab(0);
		}
	},

	selectRecord:function( grid, record ){
		var me = this,
			master  = me.pocket.lister.master(),
			master2 = me.pocket.lister.master2(),
			detail  = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
			detail3 = me.pocket.lister.detail3(),
			detail4 = me.pocket.lister.detail4(),
			layout	= me.pocket.layout(),
			imge    = layout.down('#imgTab')
		;

		detail3.down('[name=image]').setSrc(null);
		detail3.down('[name=image2]').setSrc(null);

		//버튼 클리어(숨기기)

		master2.down('[itemId=btnCopy]').hide();
		master2.down('[itemId=btnAmend]').hide();
		master2.down('[itemId=btnModify]').hide();
		master2.down('[itemId=btnDelete]').hide();

		detail.down('[itemId=btnfileSelect]').hide();
		detail.down('[itemId=btnFileDelete]').hide();

		detail3.down('[itemId=imgSelect]').hide();
		detail3.down('[itemId=imgUpdate]').hide();
		detail3.down('[itemId=imgCancel]').hide();

		detail4.down('[itemId=cnslInsertRow]').hide();
		detail4.down('[itemId=cnslDeleteRow]').hide();
		detail4.down('[itemId=btnCnslUpdate]').hide();
		detail4.down('[itemId=btnCnslCancel]').hide();
		//이미지 탭 숨기기
		imge.tab.hide();

	},

	selectDetail : function(grid, record) {
		var me = this,
			master2 = me.pocket.lister.master2(),
			detail = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
			detail3 = me.pocket.lister.detail3(),
			detail4 = me.pocket.lister.detail4(),
			layout	= me.pocket.layout(),
			tabPanel   = me.pocket.layout().down('#detail'),
			tindex= tabPanel.items.indexOf(tabPanel.getActiveTab())
			imge = layout.down('#imgTab')
		;
		detail3.down('[name=image]').setSrc(null);
		detail3.down('[name=image2]').setSrc(null);

		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();

			imge.tab.hide();

			master2.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			},{ invc_numb : record.get('invc_numb'),
				amnd_degr : record.get('amnd_degr')
			  });
			detail.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record.get('invc_numb'),
				 orgn_dvcd : 'acpt_mast' ,
				 uper_seqn : record.get('amnd_degr')
			  });
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					}, scope:me
			}, { invc_numb : record.get('invc_numb') , amnd_degr : record.get('amnd_degr') });
//			detail3.select({
//				callback:function(records, operation, success) {
//					if (success) {
//					} else { me.pocket.editor().getForm().reset(true);}
//					}, scope:me
//			}, { invc_numb : record.get('invc_numb') });
			detail4.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					}, scope:me
			}, { invc_numb : record.get('invc_numb') , uper_seqn : record.get('uper_seqn') });

			detail.down('[name=file]').popup.params.invc_numb = record.get('invc_numb');		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
			detail.down('[name=file]').popup.params.uper_seqn = record.get('amnd_degr');		// 이미지 업로드 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.

			//최종차수 버튼표시
			Ext.Ajax.request({
				url    : _global.location.href + '/system/custom/kortc/sale/order/sordermast/get/orderInfo.do',
				params : {
					token : _global.token_id,
					param : JSON.stringify({
						invc_numb : record.get('invc_numb'),
						amnd_degr : record.get('amnd_degr')
						})
				},
				method : 'POST',
				success:function(response){
					var result = Ext.decode(response.responseText);
						if (result.success) {
							if ( record.get('amnd_degr') == result.records.max_amnd_degr) {

							master2.down('[itemId=btnCopy]').show();
							master2.down('[itemId=btnAmend]').show();
							master2.down('[itemId=btnModify]').show();
							master2.down('[itemId=btnDelete]').show();

							detail.down('[itemId=btnfileSelect]').show();
							detail.down('[itemId=btnFileDelete]').show();

							detail4.down('[itemId=cnslInsertRow]').show();
							detail4.down('[itemId=cnslDeleteRow]').show();
							detail4.down('[itemId=btnCnslUpdate]').show();
							detail4.down('[itemId=btnCnslCancel]').show();
						}
					}
				},
				failure:function(result, request){
					Ext.Msg.show({ msg: '최종차수가 아닙니다.' , buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
				}
			});
			tabPanel.setActiveTab(0);
		}
	},

	 //마스터  detail 클릭시 이미지 보여주기
	selectDetail2 : function(grid, record) {
		var me = this,
			master  = me.pocket.lister.master(),
			master2 = me.pocket.lister.master2(),
			detail3 = me.pocket.lister.detail3(),
			layout	= me.pocket.layout(),
			imge = layout.down('#imgTab')
		;
		detail3.down('[name=image]').setSrc(null);
		detail3.down('[name=image2]').setSrc(null);

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		if(master){
			master2.getSelectionModel().select();

			imge.tab.show();

			detail3.down('[name=image]').setSrc(null);
			detail3.down('[name=image2]').setSrc(null);

			detail3.down('[itemId=imgSelect]').show();
			detail3.down('[itemId=imgUpdate]').show();
			detail3.down('[itemId=imgCancel]').show();

			Ext.Ajax.request({
			    url		: _global.location.http() + '/custom/kortc/sale/order/sordermast/get/image.do',
			    params	: {
				    token : _global.token_id,
				    param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: record.get('invc_numb'),
					amnd_degr		: record.get('amnd_degr'),
					line_seqn		: record.get('line_seqn')
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
				} else {
					var item_imge = result.records[0].item_imge;
					var item_imge2 = result.records[0].item_imge2;

					if(item_imge != undefined && item_imge != ''){
						var x = item_imge.toString();
						var img = new Uint8Array(x.split(",")),
						blob = new Blob([img],{type:'image/png'}),
						url = URL.createObjectURL(blob);
						detail3.down('[name=image]').setSrc(url);
					}
					if(item_imge2 != undefined && item_imge2 != ''){
						var x = item_imge2.toString();
						var img = new Uint8Array(x.split(",")),
						blob = new Blob([img],{type:'image/png'}),
						url = URL.createObjectURL(blob);
						detail3.down('[name=image2]').setSrc(url);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		 });


		mask.hide();
	{	 invc_numb : record.get('invc_numb')
		 amnd_degr : record.get('amnd_degr')
		 line_seqn : record.get('line_seqn')
	};
		detail3.down('[name=invc_numb]').setValue(record.get('invc_numb'));		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		detail3.down('[name=amnd_degr]').setValue(record.get('amnd_degr'));		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
		detail3.down('[name=line_seqn]').setValue(record.get('line_seqn'));		// 클릭시 지정해줘야한다 . lister에 있는 render는 생성시에만 발생되는 이벤트로 갱신이 안된다.
	    }
	},


	  //이미지 업로드
		imgUpdateAction : function(grid, record){
			var me = this,
			master2	= me.pocket.lister.master2(),
			detail3	= me.pocket.lister.detail3(),
			store	= master2.getStore(),
			invc_numb = '' , amnd_degr = '', line_seqn = '',
			uploadForm = detail3.down('[name=uploadForm]'),
			item_imge  = detail3.down('[name=image]').src,
			item_imge2 = detail3.down('[name=image2]').src,
			chek1	   = detail3.down('[name=imge_chek1]').getValue(),
			chek2	   = detail3.down('[name=imge_chek2]').getValue(),
			param={},
			chk1=0, chk2=0
		;
			invc_numb  = detail3.down('[name=invc_numb]').getValue();
			amnd_degr  = detail3.down('[name=amnd_degr]').getValue();
			line_seqn  = detail3.down('[name=line_seqn]').getValue();

		if(item_imge){
			if(chek1 == "" || chek1 == undefined){
				chk1 = 10;
			}
			else{
				chk1 = 1;
			}
		}
		if(item_imge2){
			if(chek2 == "" || chek2 == undefined){
				chk2 = 10;
			}else{
				chk2 = 1;
			}
		}

		param.stor_grp  = _global.stor_grp;
		param.stor_id   = _global.stor_id;
		param.invc_numb = invc_numb;
		param.amnd_degr = amnd_degr;
		param.line_seqn = line_seqn;
		param.chk1		= chk1;
		param.chk2		= chk2;
		Ext.merge(param, this.params);
		uploadForm.getForm().setValues({
			param : JSON.stringify(param)
		});
	    //submit
		uploadForm.getForm().submit({
			waitMsg:this.waitMsg, // progressbar 띄우기
			success:function(form, action){
				 Ext.Msg.alert('알림','저장 완료되었습니다.');
					store.reload();
					detail3.down('[name=imge_chek1]').setValue(null);
					detail3.down('[name=imge_chek2]').setValue(null);
			},
			failure: function(form, action) {
				Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
			}
		  })
		},


		//이미지 저장 취소
		imgCancelAction : function() {
			var	me = this,
			detail3 = me.pocket.lister.detail3()
		    ;
			detail3.getStore().reload();
		},


	amendAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			lister = me.pocket.lister.detail2(),
			popup  = me.pocket.popup(),
			store  = lister.getStore(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0]
		;

		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "amend 등록할 주문 1건을 선택 후 진행하십시오.");
			return;
		}

		resource.loadPopup({
			widget : 'module-sordermast-amend-popup',
			param : {
				invc_numb 	  : select.get('invc_numb'),
				amnd_degr     : select.get('amnd_degr'),
				new_amnd_degr : select.get('amnd_degr') + 1
			},
		});
	},


	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister()
		;

		var err_msg = "";
		if (select){
			if (select.get("line_clos") == "1") {
				err_msg = "마감된 견적입니다.";
			}
			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}
		if (select){
			editor.modifyRecord({
				caller	: me,
				action	: 'invoice',
				params	: {param:JSON.stringify({
					invc_numb : select.get('invc_numb'),
					amnd_degr : select.get('amnd_degr')
					})
				},
				lister	: lister,
				callback: function( results ) {
					if (results.success){
						me.pocket.layout().getLayout().setActiveItem(1);
						results.feedback( {success : true } );
					}
				}
			}, me);
		}
	},

	insertAction:function() {
		var me		= this,
			editor	= me.pocket.worker.editor(),
			lister	= me.pocket.worker.lister(),
			parent
		;
		editor.getStore().clearData();
		editor.getStore().loadData([],false);
		editor.getForm().reset();
		lister.getStore().clearData();
		lister.getStore().loadData([],false);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id	: _global.stor_id,
						table_nm: 'acpt_mast'
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

	updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			store	= master.getStore(),
			store2	= editor.getStore(),
			store3	= lister.getStore()
		;

		editor.updateRecord({
			caller	: me,
			action	: 'invoice',
			before	: function(results, record ) {
				if (results.success) {
					var info	= record,
						dirty	= false
					;
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
							var ms
//								i = 1
							if (results.inserted){
								ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0, ms);
							} else {}
							detail.eraser();
							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
							master.select({
								 callback:function(records, operation, success) {
									if (success) {
										master.getSelectionModel().select(ms);
									} else {}
								}, scope:me
							}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			Ext.ComponentQuery.query('module-sordermast-worker-search')[0].getForm().reset();
			master.getStore().reload();
			}
		});
	},

	updateAction4 : function() {
		var	me		= this,
			detail4  = me.pocket.lister.detail4(),
			master   = me.pocket.lister.master(),
			store    = detail4.getStore(),
			changes  = detail4.getStore().getUpdatedRecords().length,
			change   = detail4.getStore().data.items,
			length   = detail4.getStore().data.items.length,
			remove   = detail4.getStore().removed.length,
			search   = me.pocket.search()
		;

		if(changes == 0 && change.length == 0 && remove==0 ){
			Ext.Msg.alert("알림","변경된 내용이 없습니다.");
		}else {
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무
			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = detail4.getStore();

			detail4.getStore().sync({ // 저장 성공시
				success : function(operation){ Ext.Msg.alert('알림','저장 완료되었습니다.');
				master.getStore().reload();
				},
				failure : function(operation){ Ext.Msg.alert('알림','저장 실패하였습니다.'); },
				callback: function(operation){
					mask.hide();
				}
			}, {synchro : _global.objects.synchro} );
		}
	},

	cancelAction4 : function() {
		var	me = this,
			detail4 = me.pocket.lister.detail4();
		;

		detail4.getStore().reload();
	},

	/**
	 * 엑셀 업로드 액션
	 */
//	pasteUploadAction : function () {
//		var me = this ,
//			layout = me.pocket.layout()
//		;
//		layout.getLayout().setActiveItem(1);
//	},
	/**
	 * 엑셀 업로드
	 */
	excelUploadAction : function () {
		var me = this,
			param  = me.pocket.search().getValues()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'file-upload-popup',
//			sample : {
//				xtype	: 'button' ,
//				text	: '엑셀양식 받기' ,
//				iconCls	: Const.FINISH.icon ,
//				href	: 'resource/sample/수주업로드양식_코르텍.xlsx'
//			},
			apiurl : {
				upload : _global.location.href + '/system/custom/kortc/sale/order/sordermast/excel.do', // url (필수)
			},
			params : {
				stor_id	: _global.stor_id,
				table_nm: 'acpt_mast'
			},
			title			: '고객 수주내역 엑셀 Upload',					// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			}
		});
	},

	copyAction:function() {
		var me = this,
			master = me.pocket.lister.master()
			popup  = me.pocket.popup()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "복사 하시려는 1건을 선택 후 진행하십시오.");
			return;
		}

		resource.loadPopup({
			widget : 'module-sordermast-copy-popup',
			params : {
				invc_numb : records[0].get('invc_numb'),
				cstm_name : records[0].get('cstm_name'),
				cstm_idcd : records[0].get('cstm_idcd')
			},
		});
	},

	orderAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master()
		;
		if(select){
			console.log(select);
			if  (select.get('acpt_cofm_yorn') !== '0') {
				Ext.Msg.alert("알림", "이미 수주등록이 완료된 견적입니다.");
				return;
			}

			Ext.Msg.confirm("확인", "수주등록을 하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/sale/order/estimast/set/acpt.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: select.get('invc_numb'),
								deli_date	: select.get('deli_date'),
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd
							})
						},
						success : function(response, request) {
							var object = response,
								result = Ext.decode(object.responseText)
							;
							master.getStore().reload();
							Ext.Msg.alert("알림","등록이 완료 되었습니다.");
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
							me.pocket.lister.master().getStore().loadData([],true);
							me.pocket.lister.detail().getStore().loadData([],false);
						}
					});
				}
			});
		}else{
			Ext.Msg.alert("알림","등록할 견적을 선택해주십시오.");
		}
	},

	cancelAction:function() {
		var me = this,
			editor = me.pocket.worker.editor()
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
	},

	deleteAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			store  = master.getStore()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (records && records.length != 0){
			Ext.each(records, function(record) {
				if (record.get("line_clos") == "1") {
					err_msg = "마감되어 삭제할 수 없습니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/kortc/sale/order/sordermast/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							amnd_degr	: records[0].get('amnd_degr'),
							line_seqn	: 0,
							uper_seqn	: records[0].get('amnd_degr'),
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
						me.pocket.lister.detail().getStore().loadData([],false);
						me.pocket.lister.detail2().getStore().loadData([],false);
						me.pocket.lister.detail4().getStore().loadData([],false);
						master.getStore().reload();
					}
				});
			}
		});
	},

	// 견적서 발행
	printAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection(),
			jrf = 'EstiReport.jrf',
			resId = _global.options.mes_system_type?_global.options.mes_system_type.toUpperCase():_global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		var invc_numb = select[0].get('invc_numb');
		var arg =	'invc_numb~'+invc_numb+'~';

		if(resId == 'SJFLV'){
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'EstiReport_Sjflv.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
		}else if (select) {
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+_global.hq_id.toUpperCase()+'\"}';
		}

		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	deleteAction2:function(){
		var me = this,
		workerlister = me.pocket.worker.lister(),
		store  = workerlister.getStore(),
		editor = me.pocket.worker.editor(),
		record = editor.getRecord(),
		store2 = editor.getStore()
	;
		console.log(record);
		var err_msg = "";
		var records = workerlister.getSelectionModel().getSelection();

		if (!records || records.length<1) {
			Ext.Msg.alert("알림", "삭제 하시려는 자료를 선택해주세요!");
			return;
		}
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					for (var i = 0; i < records.length; i++) {
						store.remove(records[i]);
					}
					if(record.data.modi_yorn=='n'){
						record.set('modi_yorn','y');
						record.store.commitChanges();
					}
				}
			}
		});
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	}
});
