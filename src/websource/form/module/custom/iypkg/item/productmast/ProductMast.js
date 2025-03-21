Ext.define('module.custom.iypkg.item.productmast.ProductMast', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.UnitPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.FabcPopup',
		'lookup.popup.view.BxtyPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.AsmtPopup',
		'lookup.popup.view.MoldPopup',
		'lookup.popup.view.CpstNumbPopup',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.PrintSpecLiebe'
	],
	models	: [
		'module.custom.iypkg.item.productmast.model.ProductMastWkct',
		'module.custom.iypkg.item.productmast.model.ProductMastFabc',
		'module.custom.iypkg.item.productmast.model.ProductMastPric',
		'module.custom.iypkg.item.productmast.model.ProductMast',
		'module.custom.iypkg.item.productmast.model.ProductMastCalcPopup',
	],
	
	stores	: [
		'module.custom.iypkg.item.productmast.store.ProductMastFabcEditor',
		'module.custom.iypkg.item.productmast.store.ProductMastWkctEditor',
		'module.custom.iypkg.item.productmast.store.ProductMastPric',
		'module.custom.iypkg.item.productmast.store.ProductMast',
		'module.custom.iypkg.item.productmast.store.ProductMastCalcPopup',
	],
	views	: [
		'module.custom.iypkg.item.productmast.view.ProductMastLayout',
		'module.custom.iypkg.item.productmast.view.ProductMastLister',
		'module.custom.iypkg.item.productmast.view.ProductMastPricLister',
		'module.custom.iypkg.item.productmast.view.ProductMastFabcEditorLister',
		'module.custom.iypkg.item.productmast.view.ProductMastWkctEditorLister',
		'module.custom.iypkg.item.productmast.view.ProductMastSearch',
		'module.custom.iypkg.item.productmast.view.ProductMastEditor',
		'module.custom.iypkg.item.productmast.view.ProductMastCalcPopup',
		'module.custom.iypkg.item.productmast.view.ProductMastImgePopup',
		'lookup.popup.view.PrintSpecCommon',
		'module.custom.iypkg.item.productmast.view.FileUpload'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-productmast-layout button[action=selectAction]' : { click : me.selectAction },

			'module-productmast-pric-lister button[action=modifyAction]' : { click : me.modifyAction },
			'module-productmast-pric-lister button[action=insertAction]' : { click : me.insertAction },
			'module-productmast-pric-lister button[action=exportAction]' : { click : me.exportAction },
			'module-productmast-pric-lister button[action=deleteAction]' : { click : me.deleteAction },
			'module-productmast-lister button[action=ImgeAction]'		 : { click : me.ImgeAction   }, /* 이미지테스트*/

			'module-productmast-editor button[action=updateAction]' : { click : me.updateAction },
			'module-productmast-editor button[action=cancelAction]' : { click : me.cancelAction },
			'module-productmast-editor #editortab' : {
				tabchange : me.editorTabChange
			},
			'module-productmast-lister button[action=copyAction]'   : { click : me.copyAction },
			'module-productmast-lister button[action=pricAction]'   : { click : me.pricAction },
			'module-productmast-lister'	: {
				selectionchange	: me.selectRecord
			},
		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-productmast-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-productmast-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-productmast-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-productmast-lister')[0] },
		worksearch	: function () { return Ext.ComponentQuery.query('module-productmast-worker-search')[0] },
		priclister: function () { return Ext.ComponentQuery.query('module-productmast-pric-lister')[0] },
		wkcteditorlister: function () { return Ext.ComponentQuery.query('module-productmast-editor-wkctlister')[0] },
		fabceditorlister: function () { return Ext.ComponentQuery.query('module-productmast-editor-fabclister')[0] },
		printspec: function () { return Ext.ComponentQuery.query('lookup-printspec-common')[0] },
		printspec2: function () { return Ext.ComponentQuery.query('lookup-printspec-liebe')[0] },
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},
	editorTabChange:function(tabPanel, newCard, oldCard){
		var me			= this,
			tpanel		= me.pocket.editor().down('#editortab'),
			tindex		= tpanel.items.indexOf(tabPanel.getActiveTab()),
			lister		= me.pocket.lister(),
			editor		= me.pocket.editor(),
			select		= lister.getSelectionModel().getSelection()[0],
			prod_idcd	= editor.down('[name=prod_idcd]').getValue()
		;
		if(tindex==3){
			var doc = document.getElementsByName("files")[0];	// this나 extjs field는 element가 아니므로 height줘도 소용없음.
			var btn = document.getElementsByClassName("imageButton_1")[0];
//			doc.style.height = '200';							//input 크기를 늘려줘야 버튼 늘어난 만큼 클릭해도 팝업이나옴.
		}
	},
	//선택
	selectRecord:function( grid, record ){
		var me = this,
			editor = me.pocket.editor(),
			worksearch			= me.pocket.worksearch(),
			wkcteditorlister	= me.pocket.wkcteditorlister(),
			fabceditorlister	= me.pocket.fabceditorlister(),
			priclister			= me.pocket.priclister()
		;

		if(record[0]){

			priclister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( record[0].data, {stor_id : _global.stor_id}) );

			wkcteditorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( record[0].data, {stor_id : _global.stor_id}) );

			fabceditorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( record[0].data, {stor_id : _global.stor_id}) );

			editor.selectRecord({ lister : me.pocket.lister(), record : record[0] }, me);

			if(_global.hq_id.toUpperCase()=='N1000LIEBE'){
				editor.down('[itemId=printspec2]').clearField();
				editor.down('[itemId=printspec2]').down('[name=invc_numb]').setValue(record[0].get('prod_idcd'));
			}else{
				editor.down('[itemId=printspec]').clearField();
				editor.down('[itemId=printspec]').down('[name=invc_numb]').setValue(record[0].get('prod_idcd'));
			}
		}
	},
	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			select = lister.getSelectionModel().getSelection()[0],
			tpanel		= editor.down('#editortab'),
			wkcteditorlister	= me.pocket.wkcteditorlister(),
			fabceditorlister	= me.pocket.fabceditorlister(),
			printspec			= me.pocket.printspec(),
			printspec2			= me.pocket.printspec2()
		;
		tpanel.setActiveTab(0);
		editor.down('[name=cstm_name]').readOnly = false;
		editor.down('[itemId=updateProd]').show();
		editor.down('[itemId=cancelProd]').show();
		if(select){
			if(_global.hq_id.toUpperCase()=='N1000LIEBE'){
				printspec2.down('[name=orgn_dvcd]').setValue('product_mast');
				printspec2.down('[name=invc_numb]').setValue(select.get('prod_idcd'));
			}else{
				printspec.down('[name=orgn_dvcd]').setValue('product_mast');
				printspec.down('[name=invc_numb]').setValue(select.get('prod_idcd'));
			}

			wkcteditorlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( select.data, {stor_id : _global.stor_id}) );
			fabceditorlister.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge( select.data, {stor_id : _global.stor_id}) );

			editor.selectRecord({ lister : me.pocket.lister(), record : select }, me);
		}else{
			Ext.Msg.alert('알림','제품코드를 선택해주세요.');
			return;
		}

		editor.modifyRecord({
			callback : function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true);
				}
			}
		}, me);
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			wkcteditorlister	= me.pocket.wkcteditorlister(),
			fabceditorlister	= me.pocket.fabceditorlister(),
			worksearch			= me.pocket.worksearch(),
			printspec			= me.pocket.printspec()
		;
		editor.down('[name=cstm_name]').readOnly = false;
		editor.down('[itemId=updateProd]').show();
		editor.down('[itemId=cancelProd]').show();

		wkcteditorlister.getStore().clearData();
		wkcteditorlister.getStore().loadData([],false);

		fabceditorlister.getStore().clearData();
		fabceditorlister.getStore().loadData([],false);
		printspec.down('[name=orgn_dvcd]').setValue('product_mast');

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'product_mast'
					})
				}
			},
			callback : function (keygen) {
				if (keygen.success) {
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							prod_idcd : keygen.records[0].seq,
							crny_dvcd : '1000',
						}),
						lister	: lister,
						disables: [me.pocket.layout().down('#mainpanel'), me.pocket.search().setDisabled(true)],
						callback: function (results) {
							if (results.success) {
								results.feedback({success : true , visible : true });
							}
						}
					});
				}
			}
		});
	},


	/**
	 * 저장
	 */
	updateAction:function() {
		var me			= this,
			editor		= me.pocket.editor(),
			lister		= me.pocket.lister(),
			store		= lister.getStore(),
			wkctstore	= me.pocket.wkcteditorlister().getStore(),
			fabcstore	= me.pocket.fabceditorlister().getStore(),
			printspec	= me.pocket.printspec(),
			printspec2	= me.pocket.printspec2(),
			check		= null,
			check2		= true,
			msg			='',
			select		= lister.getSelectionModel().getSelection()[0]
		;
		wkctstore.each(function(findrecord){
//			if(findrecord.get('stnd_pric') == '' ||findrecord.get('stnd_pric') < 0 || findrecord.get('stnd_pric') == null){
//				msg = "작업공정에서 표준단가를 입력하여 주시기 바랍니다."
//					check = '1';
//			}
//			if(findrecord.get('wkun_dvcd') == '' || findrecord.get('wkun_dvcd') == null){
//				msg = "작업공정에서 작업단위를 입력하여 주시기 바랍니다."
//					check = '1';
//			}
			if(findrecord.get('wkct_idcd') == '' || findrecord.get('wkct_idcd') == null){
				msg = "작업공정에서 공정명을 선택하여 주시기 바랍니다."
				check = '1';
			}
			if(findrecord.get('rep_chek')){//임시,최종공정 없는 데이터 입력 후 삭제예정
				check2 = false;
			}
		});
		fabcstore.each(function(findrecord){
			if(findrecord.get('fabc_idcd') == '' || findrecord.get('fabc_idcd') == null){
				msg = "원단투입에서 원단명을 선택하여 주시기 바랍니다.";
				check = '1';
			}
		});
		if(check2){  //임시,최종공정 없는 데이터 입력 후 삭제예정
			Ext.Msg.alert("알림",'최종공정이 선택되지 않았습니다. 작업공정을 확인해주세요.');
			return;
		}
		if(check){
			Ext.Msg.alert("알림",msg);
			return;
		}

		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if	(results.success) {
					if	(record.phantom && Ext.isEmpty(record.get('prod_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'product_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('records' , keygen.records[0].seq );
									record.dirtyValue('prod_code' , keygen.records[0].code );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){
							results.feedback({success : true  });
							if(_global.hq_id.toUpperCase()=='N1000LIEBE'){
								printspec2.update();
							}else{
								printspec.update();
							}
//							lister.select({
//								callback:function(records, operation, success) {
//								if (success) {
//									lister.getSelectionModel().select(0);
//								} else { me.pocket.editor().getForm().reset(true);}
//								}, scope:me
//							}, Ext.merge( {prod_idcd:select.get('prod_idcd') },{stor_id : _global.stor_id}) );
							editor.down('[itemId=updateProd]').hide();
							editor.down('[itemId=cancelProd]').hide();
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){

					wkctstore.sync({
						success : function(operation){
						},
						failure : function(operation){ },
						callback: function(operation){  }
					} );
					fabcstore.sync({
						success : function(operation){
						},
						failure : function(operation){ },
						callback: function(operation){ }
					} );
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
//					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
						}
				}
			}
		});

	;
	},

	//취소
	cancelAction:function() {
		var me			= this, editor = me.pocket.editor(),
			master		= me.pocket.lister(),
			select		= master.getSelectionModel().getSelection()[0],
			editor		= me.pocket.editor(),
			printspec	= me.pocket.printspec()
		;
		editor.down('[itemId=updateProd]').hide();
		editor.down('[itemId=cancelProd]').hide();
		editor.down('[name=cstm_name]').readOnly = true;

		printspec.clearField();
		editor.cancelRecord({
			caller : me,
			lister : master,
			callback : function( results ) {
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
				results.feedback( {success : true});
			}
		}, me);
	},

	deleteAction : function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			records = lister.getSelectionModel().getSelection(),
			store = lister.getStore()
		;
		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/item/productmast/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							prod_idcd	: records[0].data.prod_idcd
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							store.remove(records[0]);
							store.commitChanges();
							store.reload();
						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						mask.hide();
					}
				});
			}
		});
	},

	copyAction:function() {
		var	me		= this,
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection()[0],
			search	= me.pocket.search(),
			param	= search.getValues(),
			code
		;
		if(select){
			Ext.Msg.confirm("확인", "복사하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.Ajax.request({
						url		: _global.api_host_info + "/system/custom/iypkg/item/productmast/set/copy.do",
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id		: _global.stor_id,
								prod_idcd	: select.get('prod_idcd')
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
								code = result.records[0]._new_code;
								Ext.Msg.alert("알림","제품코드  "+code+" 번으로 복사가 완료되었습니다.");
							}
						},
						failure : function(result, request) {
						},
						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						}
					});

					//복사한 코드를 서치되게끔
					search.down('[name=find_name]').setValue(code);
					lister.select({
						callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else { me.pocket.editor().getForm().reset(true);}
						}, scope:me
					}, Ext.merge({stor_id : _global.stor_id, find_name : code}) );
				}
			});
		}else{
			Ext.Msg.alert("알림","제품코드를 선택해주세요.");
			return;
		}
	},
	pricAction : function () {
		var me = this,
			master = me.pocket.lister()
		;
		// 엑셀 업로드 팝업
		resource.loadPopup({
			widget : 'module-iypkg-product-upload',
			sample : {
			},
			apiurl : {
				upload : _global.location.href + '/system/custom/iypkg/item/productmast/excel.do', // url (필수)
			},
			params : {
				stor_id	: _global.stor_id,
				table_nm: 'product_mast',
			},
			title			: '단가 Upload',							// popup title (옵션)
			waitMsg			: '업로드중...',							// upload시 progress bar의 wait message (옵션)
			allowExtension	: ['xls', 'xlsx'],						// 지정하지 않으면 확장자 무제한 (옵션)
			uploadBtnConfig	: {										// upload버튼의 config속성 (속성은 api참고) (옵션)
				text : '엑셀 Upload'
			},
			listeners: {
				close:function(){
					master.getStore().reload();
				}
			}
		});
	},

	// 이미지테스트
	ImgeAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			records  = lister.getSelectionModel().getSelection()[0],
			item_imge  = editor.down('[itemId=printspec]').down('[name=center]').src
			err_msg = ""
		;
		console.log( item_imge);

		if (records) {
			resource.loadPopup({
				widget : 'module-productmast-imge-popup',
				params : { prod_idcd : records.get('prod_idcd')}

			});
		}else{
			Ext.Msg.alert("알림", "품목코드 1건을 선택 후 진행하십시오.");
			return;
		}

	},

	exportAction : function(button){
		var value = button.button,
			lister = '' ;
		;
		if(button.itemId == 'lister'){
			lister = this.pocket.lister();
		}else if(button.itemId == 'wkct'){
			lister = this.pocket.wkct_lister2();
		}else if(button.itemId == 'fabc'){
			lister = this.pocket.fabc_lister2();
		}
		lister.writer({enableLoadMask:true});
	}
});

