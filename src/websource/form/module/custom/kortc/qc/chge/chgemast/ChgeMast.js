Ext.define('module.custom.kortc.qc.chge.chgemast.ChgeMast', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmClassPopup',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.ItemPopupKortc'
	],
	models	: [
		'module.custom.kortc.qc.chge.chgemast.model.ChgeMastLister',
		'module.custom.kortc.qc.chge.chgemast.model.ChgeMastFile'
	],
	stores	: [
		'module.custom.kortc.qc.chge.chgemast.store.ChgeMastLister',
		'module.custom.kortc.qc.chge.chgemast.store.ChgeMastLister2',
		'module.custom.kortc.qc.chge.chgemast.store.ChgeMastFile'
	],
	views	: [
		'module.custom.kortc.qc.chge.chgemast.view.ChgeMastLayout',
		'module.custom.kortc.qc.chge.chgemast.view.ChgeMastSearch',
		'module.custom.kortc.qc.chge.chgemast.view.ChgeMastLister',
		'module.custom.kortc.qc.chge.chgemast.view.ChgeMastLister2',
		'module.custom.kortc.qc.chge.chgemast.view.ChgeMastFileLister',
		'module.custom.kortc.qc.chge.chgemast.view.ChgeMastEditor',
		'module.custom.kortc.qc.chge.chgemast.view.ChgeMastPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-chgemast-layout #mainpanel'								: { tabchange : me.selectAction	},
			'module-chgemast-layout button[action=selectAction]'			: { click : me.selectAction },

			'module-chgemast-lister button[action=filePopup]'				: { click : me.filePopup 	},	// 4M변경관리 팝업열기

			'module-chgemast-lister button[action=insertAction]'			: { click : me.insertAction },	// 4M변경관리 추가
			'module-chgemast-lister button[action=modifyAction]'			: { click : me.modifyAction2},	// 4M변경관리 수정
			'module-chgemast-lister button[action=deleteAction]'			: { click : me.deleteAction },	// 4M변경관리 삭제
			'module-chgemast-lister button[action=exportAction]'			: { click : me.exportAction },
			'module-chgemast-lister'										: { selectionchange: me.attachRecord },
			'module-chgemast-lister2'										: { selectionchange: me.attachRecord2 },

			'module-chgemast-lister2 button[action=modifyAction]'			: { click : me.modifyAction },	// 수정
			'module-chgemast-lister2 button[action=deleteAction]'			: { click : me.deleteAction },
			'module-chgemast-lister2 button[action=printAction]'			: { click : me.printAction },	// 부적합보고서 출력

			'module-chgemast-editor button[action=updateAction]'			: { click : me.updateAction },
			'module-chgemast-editor button[action=updateAction2]'			: { click : me.updateAction2 },
			'module-chgemast-editor button[action=cancelAction]'			: { click : me.cancelAction },
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-chgemast-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-chgemast-search')[0] },
		lister		: function () { return Ext.ComponentQuery.query('module-chgemast-lister')[0] },
		lister2		: function () { return Ext.ComponentQuery.query('module-chgemast-lister2')[0] },
		mrblister	: function () { return Ext.ComponentQuery.query('module-chgemast-mrblister')[0] },
		editor 		: function () { return Ext.ComponentQuery.query('module-chgemast-editor')[0] },
		filelister	: function () { return Ext.ComponentQuery.query('module-chgemast-filelister')[0] },
		popup		: function () { return Ext.ComponentQuery.query('module-chgemast-popup')[0] }
	},

	//조회
	selectAction:function(grid, record) {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			editor = me.pocket.editor(),
			mrblister = me.pocket.mrblister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			master = undefined

		;

		if ( tindex == 0 ) {
			master = lister;
		}else if(tindex == 1){
			master = lister2;
		}


		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		master.select({
			callback:function(records, operation, success) {
				if (success) {
					master.getSelectionModel().select(0);
				} else { }
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id }) );
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
		editor = me.pocket.editor();
		if(record[0]){
			filelister = me.pocket.filelister(),
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
			filelister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					}, scope:me
			}, { invc_numb : record[0].get('invc_numb'),orgn_dvcd : 'chge_mast' });
			filelister.down('[name=file]').popup.params.invc_numb = record[0].get('invc_numb');
		}
	},

	filePopup:function(){
		var me 			= this,
			popup		= me.pocket.popup(),
			select		= me.pocket.lister().getSelectionModel().getSelection()[0],
			lister		= me.pocket.lister(),
			filelister 	= me.pocket.filelister();

		var popup2 = resource.loadPopup({
				widget	: 'module-chgemast-popup',
				params : {
					invc_numb : select.data.invc_numb,
			},
		});
		popup2.down('[name=file]').popup.params.invc_numb = select.data.invc_numb;
	},

	/**
	 * 선택
	 */
	attachRecord:function( smodel, record ){
		console.log(record);
		var me = this;
		var editor = me.pocket.editor(),
			filelister = me.pocket.filelister(),
			lister	= me.pocket.lister()
			popup	= me.pocket.popup()
		;
		if(record!=''){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);

			/*editor.attachRecord({
				caller : me ,
				lister : lister ,
				record : record ? record : lister.getSelectionModel().getSelection()
			});*/

			filelister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : record[0].get('invc_numb'),orgn_dvcd : 'chge_mast'});
			filelister.down('[name=file]').popup.params.invc_numb = record[0].get('invc_numb');
//			popup.down('[name=invc_numb]').setValue(record.data.invc_numb);
			console.log(filelister.down('[name=file]').popup.params.invc_numb);
			lister.down('[itemId=modiBtn]').show();
			lister.down('[itemId=deleBtn]').show();
			lister.down('[itemId=fileBtn]').show();
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			layout = me.pocket.layout(),
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			filelister	= me.pocket.filelister()
		;

		/*filelister.getStore().clearData();
		filelister.getStore().loadData([],false);*/

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url		: _global.location.http() + '/listener/seq/maxid.do',
				object	: resource.keygen,
				params	: {
					token : _global.token_id ,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'chge_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							invc_numb : keygen.records[0].seq
						}),
						lister		: lister,
						disables	: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback: function (results){
							if (results.success) {
								results.feedback({success : true , visible : true });
								filelister.down('[name=file]').popup.params.invc_numb = editor.getValues().invc_numb;
								console.log(filelister.down('[name=file]').popup.params);
							}
						}
					});
				}
			}
		});
	},

	// 수정
	modifyAction2:function(){
		var me 	= this,
		editor 	= me.pocket.editor(),
		lister 	= me.pocket.lister(),
		select	= me.pocket.lister().getSelectionModel().getSelection()[0],
		filelister	= me.pocket.filelister()
	;

	me.checkConvert2(select);
	me.checkYorN(select);
	editor.modifyRecord({
		caller	: me,
		keygen	: {
			url		: _global.location.http() + '/listener/seq/maxid.do',
			object	: resource.keygen,
			params	: {
				token : _global.token_id ,
				param : JSON.stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'chge_mast'
				})
			}
		},
		callback : function (keygen){
			if (keygen.success){
				editor.insertRecord({
					caller	: me,
					record	: select,
					lister	: lister,
					disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
					callback: function (results){
						if (results.success) {
							results.feedback({success : true , visible : true });
						}
					}
				});
			}
		},
	});
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		master		= me.pocket.lister(),
		editor		= me.pocket.editor(),
		values		= editor.getValues()


		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);

	},


	//저장
	updateAction:function() {
		var me 		= this,
			select	= me.pocket.lister().getSelectionModel().getSelection()[0],
			lister 	= me.pocket.lister(),
			editor 	= me.pocket.editor(),
			store  	= lister.getStore()
			//mrb_store	= me.pocket.mrblister().getStore()
		;

		console.log(select);
		editor.updateRecord({
			caller : me,
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record ) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('invc_numb'))) {
						resource.keygen({
							url			: _global.location.http () + '/listener/seq/maxid.do',
							object		: resource.keygen,
							params		: {
								token	: _global.token_id ,
								param	: JSON.stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'chge_mast',
								 })
							 },
							async		: false,
							callback	: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('invc_numb' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else {
						results.feedback({success : true  }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						/*success : function(operation){
							mrb_store.sync();
							results.feedback({success : true  });
						},*/
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
					me.checkConvert(record);
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
				}
			},
			finished : function(results, record, operation){
				console.log(record);
				if (results.success){
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
						case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(lister, record );           break;
					}
				}
			}
		});

	},

	//저장
	updateAction2:function() {
		var me = this,
			lister = me.pocket.lister2(),
			editor = me.pocket.editor(),
			store  = lister.getStore(),
			mrb_store	= me.pocket.mrblister().getStore()
		;

		editor.updateRecord({
			store  : store,
			action : Const.EDITOR.DEFAULT,
			before : function(results, record ) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('invc_numb'))) {
						resource.keygen({
							url			: _global. location.http () + '/listener/seq/maxid.do',
							object		: resource. keygen,
							params		: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: '',
								 })
							 },
							async		: false,
							callback	: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('invc_numb' , keygen.records[0].seq );
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else { results.feedback({success : true  }); }
				}
			},
			callback : function(results, record ) {
				if (results.success) {
					store.sync({
						success : function(operation){
							mrb_store.sync();
							results.feedback({success : true  });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
					lister.getStore().reload();
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
						case Const.EDITOR.PROCESS.UPDATE : me.attachRecord(lister, record );           break;
					}
				}
			}
		});

	},

	deleteAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore(),
			select	= lister.getSelectionModel().getSelection()


		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();

		if (select[0]) {
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					Ext.each(select, function(record) {
						record.dirtyValue('line_stat', '2');
						record.store.commitChanges();
					});
				Ext.each(select, function(record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/kortc/qc/chge/chgemast/set/del_yn.do',
						method		: "POST",
						params		: {
						 	token	: _global.token_id,
							param	: Ext.encode({
								invc_numb	: record.get('invc_numb'),
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								lister.getStore().reload();
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							mask.hide();
							}
						});
					})
				}
			});
		}
	},

	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			mrblister = me.pocket.mrblister()
		;

		editor.modifyRecord({
			caller	: me,
			callback: function( results ) {
				if (results.success){
					results.feedback( {success : true, visible : true } );
					me.pocket.layout().down('#mainpanel').setDisabled(true);
					me.pocket.search().setDisabled(true)
				}
			}
		},me);
		mrblister.select({
			callback:function(records, operation, success) {
			if (success) {
			} else { me.pocket.editor().getForm().reset(true);}
			}, scope:me
		}, Ext.merge( {stor_id : _global.stor_id , invc_numb : editor.getRecord().data.invc_numb}) );
		editor.down('[itemId=lister1]').hide();
		editor.down('[itemId=lister2]').show();
	},

	// 부적합보고서 출력
	printAction : function() {
		var me = this,
		lister = me.pocket.lister2(),
		select = me.pocket.lister2().getSelectionModel().getSelection(),
		jrf ='kortc_insp_report.jrf' ,
		resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
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

	exportAction : function(button){
		var value = button.button ;
		this.pocket.lister().writer({enableLoadMask:true});
	},

	checkConvert:function(select){
		if(select.get('4mdv_1fst') == "on"){
			select.set('4mdv_1fst', '●');
		}else{
			select.set('4mdv_1fst', '');
		}
		if(select.get('4mdv_2snd') == "on"){
			select.set('4mdv_2snd', '●');
		}else{
			select.set('4mdv_2snd', '');
		}
		if(select.get('4mdv_3trd') == "on"){
			select.set('4mdv_3trd', '●');
		}else{
			select.set('4mdv_3trd', '');
		}
		if(select.get('4mdv_4frt') == "on"){
			select.set('4mdv_4frt', '●');
		}else{
			select.set('4mdv_4frt', '');
		}
		if(select.get('chek_yorn_1fst') == "on"){
			select.set('chek_yorn_1fst', '●');
		}else{
			select.set('chek_yorn_1fst', '');
		}
		if(select.get('chek_yorn_2snd') == "on"){
			select.set('chek_yorn_2snd', '●');
		}else{
			select.set('chek_yorn_2snd', '');
		}
		if(select.get('chek_yorn_3trd') == "on"){
			select.set('chek_yorn_3trd', '●');
		}else{
			select.set('chek_yorn_3trd', '');
		}
		if(select.get('mvfr_lott_1fst') == "on"){
			select.set('mvfr_lott_1fst', '●');
		}else{
			select.set('mvfr_lott_1fst', '');
		}
		if(select.get('mvfr_lott_2snd') == "on"){
			select.set('mvfr_lott_2snd', '●');
		}else{
			select.set('mvfr_lott_2snd', '');
		}
		if(select.get('mvfr_lott_3trd') == "on"){
			select.set('mvfr_lott_3trd', '●');
		}else{
			select.set('mvfr_lott_3trd', '');
		}
	},

	checkConvert2:function(select){
		if(select.get('4mdv_1fst') == "●"){
			select.set('4mdv_1fst', '1');
		}
		if(select.get('4mdv_2snd') == "●"){
			select.set('4mdv_2snd', '1');
		}
		if(select.get('4mdv_3trd') == "●"){
			select.set('4mdv_3trd', '1');
		}
		if(select.get('4mdv_4frt') == "●"){
			select.set('4mdv_4frt', '1');
		}
		if(select.get('chek_yorn_1fst') == "●"){
			select.set('chek_yorn_1fst', '1');
		}
		if(select.get('chek_yorn_2snd') == "●"){
			select.set('chek_yorn_2snd', '1');
		}
		if(select.get('chek_yorn_3trd') == "●"){
			select.set('chek_yorn_3trd', '1');
		}
		if(select.get('mvfr_lott_1fst') == "●"){
			select.set('mvfr_lott_1fst', '1');
		}
		if(select.get('mvfr_lott_2snd') == "●"){
			select.set('mvfr_lott_2snd', '1');
		}
		if(select.get('mvfr_lott_3trd') == "●"){
			select.set('mvfr_lott_3trd', '1');
		}
	},

	checkYorN:function(select){
		select.set('chck_yorn', '0');
	}
});

