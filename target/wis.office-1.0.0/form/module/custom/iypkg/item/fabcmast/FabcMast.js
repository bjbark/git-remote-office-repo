Ext.define('module.custom.iypkg.item.fabcmast.FabcMast', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.PperPopup',
		'lookup.popup.view.CstmPopup',
	],

	models	: [
		'module.custom.iypkg.item.fabcmast.model.FabcMast',
		'module.custom.iypkg.item.fabcmast.model.FabcMastPric',
		'module.custom.iypkg.item.fabcmast.model.FabcMastBom',
	],
	stores	: [
		'module.custom.iypkg.item.fabcmast.store.FabcMast',
		'module.custom.iypkg.item.fabcmast.store.FabcMast2',
		'module.custom.iypkg.item.fabcmast.store.FabcMastDetail1',
		'module.custom.iypkg.item.fabcmast.store.FabcMastDetail2',
		'module.custom.iypkg.item.fabcmast.store.FabcMastDetail3',
		'module.custom.iypkg.item.fabcmast.store.FabcMastImage',
		'module.custom.iypkg.item.fabcmast.store.FabcMastBomLister',
		'module.custom.iypkg.item.fabcmast.store.FabcMastPricLister',
	],
	views	: [
		'module.custom.iypkg.item.fabcmast.view.FabcMastLayout',
		'module.custom.iypkg.item.fabcmast.view.FabcMastSearch',
		'module.custom.iypkg.item.fabcmast.view.FabcMastMaster',
		'module.custom.iypkg.item.fabcmast.view.FabcMastMaster2',
		'module.custom.iypkg.item.fabcmast.view.FabcMastDetail1',
		'module.custom.iypkg.item.fabcmast.view.FabcMastDetail2',
		'module.custom.iypkg.item.fabcmast.view.FabcMastDetail3',
		'module.custom.iypkg.item.fabcmast.view.FabcMastImage',
		'module.custom.iypkg.item.fabcmast.view.FabcMastEditor',
		'module.custom.iypkg.item.fabcmast.view.FabcMastBomLister',
		'module.custom.iypkg.item.fabcmast.view.FabcMastPricLister',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-fabcmast-layout #mainpanel'							: { tabchange : me.selectAction	},
			'module-fabcmast-layout  button[action=selectAction]'		: { click : me.selectAction },	// 조회

			'module-fabcmast-editor  button[action=updateAction]'		: { click : me.updateAction },	//저장
			'module-fabcmast-detail2 button[action=modifyAction]'		: { click : me.modifyAction },	//수정
			'module-fabcmast-detail2 button[action=deleteAction]'		: { click : me.deleteAction },	//삭제

			'module-fabcmast-detail2 button[action=insertAction]'		: { click : me.insertAction },	//추가
			'module-fabcmast-editor  button[action=cancelAction]'		: { click : me.cancelAction },	//취소

			'module-fabcmast-master button[action=exportAction]'		: { click : me.exportAction },	// 엑셀1
			'module-fabcmast-detail1 button[action=exportAction]'		: { click : me.exportAction2 },	// 엑셀2
			'module-fabcmast-detail2 button[action=exportAction]'		: { click : me.exportAction3 },	// 엑셀3
			'module-fabcmast-detail3 button[action=exportAction]'		: { click : me.exportAction4 },	// 엑셀4

			'module-fabcmast-master'	: {
				selectionchange	: me.selectRecord
			},


			'module-fabcmast-master2'	: {
				selectionchange	: me.selectDetail2
			},

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-fabcmast-layout')  [0] },
		search	: function () { return Ext.ComponentQuery.query('module-fabcmast-search')  [0] },
		editor	: function () { return Ext.ComponentQuery.query('module-fabcmast-editor')  [0] },
		lister	: function () { return Ext.ComponentQuery.query('module-fabcmast-master')  [0] },
		lister2	: function () { return Ext.ComponentQuery.query('module-fabcmast-master2') [0] },
		detail1	: function () { return Ext.ComponentQuery.query('module-fabcmast-detail1') [0] },
		detail2	: function () { return Ext.ComponentQuery.query('module-fabcmast-detail2') [0] },
		detail3	: function () { return Ext.ComponentQuery.query('module-fabcmast-detail3') [0] },
		image	: function () { return Ext.ComponentQuery.query('module-fabcmast-image')   [0] },
		bomlister	: function () { return Ext.ComponentQuery.query('module-fabcmast-bomlister') [0] },
		priclister	: function () { return Ext.ComponentQuery.query('module-fabcmast-priclister') [0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			tab
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		if(tindex==0){
			me.pocket.layout().down('#editor').show();
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}else if(tindex==1){
			me.pocket.layout().down('#editor').hide();
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister2.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	// 디테일 조회2
	selectDetail2 : function(grid, record) {
		var me = this,
			detail3 = me.pocket.detail3()
		;
		if (record.length > 0) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();

			detail3.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			}, { cstm_idcd : record[0].data.cstm_idcd});
			mask.hide();

		}
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this,
			editor = me.pocket.editor(),
			image	= me.pocket.image(),
			detail1	= me.pocket.detail1(),
			detail2	= me.pocket.detail2()
		;

		detail1.getStore().clearData();
		detail1.getStore().loadData([],false);

		detail2.getStore().clearData();
		detail2.getStore().loadData([],false);

		image.down('[name=imge_1fst]').setSrc('');

		if(record.length > 0){
			var url = 'unknown';
			Ext.Ajax.request({
				url		: _global.location.http() + '/upload/get/imagesearch.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						invc_numb	: record[0].get('fabc_idcd'),
						orgn_dvcd	: 'fabc_mast',
						file_dvcd_1fst	: '3100'
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
						if(result.records.length > 0){
							var record = result.records[0],
								Img_format = "\\.(bmp|gif|jpg|jpeg|png)$";

							url = result.records[0].file_path;
							console.log(_global.img_http+url);

							if(new RegExp(Img_format).test(url)){
								image.down('[name=imge_1fst]').setSrc(_global.img_http+url);
							}
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});

			detail1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id, fabc_idcd : record[0].data.fabc_idcd}) );

			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
				}, scope:me
			}, Ext.merge( {stor_id : _global.stor_id, fabc_idcd : record[0].data.fabc_idcd}) );

		}
	},

	//추가
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			bomlister  = me.pocket.bomlister(),
			priclister = me.pocket.priclister(),
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			image = me.pocket.image()
		;
		editor.down('[name=image]').setSrc('');
		editor.down('[name=imge_chek1]').setValue('');

		bomlister.getStore().clearData();
		bomlister.getStore().loadData([],false);

		priclister.getStore().clearData();
		priclister.getStore().loadData([],false);

		editor.insertBefore({
			caller	: me,
			keygen	: {
				url			: _global.location.http() + '/listener/seq/maxid.do',
				object		: resource.keygen,
				params		: {
					token	: _global.token_id ,
					param	: JSON.stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'fabc_mast'
					})
				}
			},
			callback : function (keygen){
				if (keygen.success){
					editor.insertRecord({
						caller	: me,
						record	: Ext.create( lister.getStore().model.modelName,{
							fabc_idcd : keygen.records[0].seq,
						}),
						lister	: lister,
						disables: [me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
						callback: function (results){
							if (results.success) {
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
			editor = me.pocket.editor(),
			bomlister  = me.pocket.bomlister(),
			priclister = me.pocket.priclister(),
			lister = me.pocket.lister(),
			select = lister.getSelectionModel().getSelection()[0]
		;

		if(select){
			editor.down('[name=image]').setSrc('');

			var url = 'unknown';
			Ext.Ajax.request({
				url		: _global.location.http() + '/upload/get/imagesearch.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						invc_numb	: select.get('fabc_idcd'),
						orgn_dvcd	: 'fabc_mast',
						file_dvcd_1fst	: '3100'
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
						if(result.records.length > 0){
							var record = result.records[0],
								Img_format = "\\.(bmp|gif|jpg|jpeg|png)$";

							url = result.records[0].file_path;

							if(new RegExp(Img_format).test(url)){
								editor.down('[name=image]').setSrc(_global.img_http+url);
							}
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});

			bomlister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge({stor_id : _global.stor_id, fabc_idcd : select.data.fabc_idcd}) );

			priclister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge({stor_id : _global.stor_id, fabc_idcd : select.data.fabc_idcd}) );

			editor.selectRecord({ lister : me.pocket.lister(), record : select }, me);

		}else{
			Ext.Msg.alert('알림','원단코드를 선택해주세요.');
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

	//취소
	cancelAction:function() {
		var me			= this, editor = me.pocket.editor(),
			master		= me.pocket.lister(),
			select		= master.getSelectionModel().getSelection()[0],
			editor		= me.pocket.editor(),
			bomlister	= me.pocket.bomlister(),
			priclister	= me.pocket.priclister()
		;

		bomlister.getStore().clearData();
		bomlister.getStore().loadData([],false);

		priclister.getStore().clearData();
		priclister.getStore().loadData([],false);

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
				editor.down('[name=image]').setSrc('');
				editor.form.reset();
			}
		}, me);
	},

	//저장
	updateAction:function() {
		var me			= this,
			editor		= me.pocket.editor(),
			bomlister	= me.pocket.bomlister().getStore(),
			priclister	= me.pocket.priclister().getStore(),
			lister		= me.pocket.lister(),
			store		= lister.getStore(),
			records		= editor.getValues(),
			select		= lister.getSelectionModel().getSelection()[0],
			fabc_idcd, fabc_code
			check		= '1'
		;

		if(records.fabc_code == ''){
			Ext.Msg.alert("알림","원단코드를 입력해주세요.");
			return;
		}else if(records.fabc_name == ''){
			Ext.Msg.alert("알림","원단명을 입력해주세요.");
			return;
		}else if(records.ppln_dvcd == ''){
			Ext.Msg.alert("알림","지골을 선택해주세요.");
			return;
		}else if(records.ppkd_dvcd == ''){
			Ext.Msg.alert("알림","지종을 선택해주세요.");
			return;
		}else if(records.ppsg_dvcd == ''){
			Ext.Msg.alert("알림","단종을 선택해주세요.");
			return;
		}

		bomlister.each(function(findrecord){
			if(findrecord.get('pper_idcd') == '' || findrecord.get('pper_idcd') == null){
				Ext.Msg.alert("알림","배합구성표에서 원지를 선택하여 주시기 바랍니다.");
				check = '0';
			}else if(findrecord.get('pnyg_volm') == '' || findrecord.get('pnyg_volm') == null){
				Ext.Msg.alert("알림","배합구성표에서 평량을 입력하여 주시기 바랍니다.");
				check = '0';
			}
		});

		priclister.each(function(findrecord){
			if(findrecord.get('puch_pric') == '' || findrecord.get('puch_pric') == null){
				Ext.Msg.alert("알림","매입처별단가에서 단가를 입력하여 주시기 바랍니다.");
				check = '0';
			}
		});

		if(check != '1'){
			return;
		}

		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if	(results.success) {
					if	(record.phantom && Ext.isEmpty(record.get('fabc_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'fabc_mast'
								})
							 },
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('records' , keygen.records[0].seq );
									record.dirtyValue('fabc_code' , keygen.records[0].code );
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
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					} );
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
						switch (operation) {
							case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record ); break;
					}
				}
			}
		});

		bomlister.sync();
		priclister.sync();

		var	uploadForm	= editor.down('[name=uploadForm]'),
			select		= lister.getSelectionModel().getSelection()[0],
			chek1		= editor.down('[name=imge_chek1]').getValue(),
			fabc_idcd	= editor.down('[name=fabc_idcd]').getValue(),
			file_dvcd_1fst = '3100'
			param={}
		;


		if(chek1=='Y'){
			param.orgn_dvcd			= 'fabc_mast',
			param.stor_grp			= _global.stor_grp;
			param.stor_id			= _global.stor_id;
			param.hqof_idcd			= _global.hq_id;
			param.invc_numb			= fabc_idcd;
			param.line_seqn			= 0;
			param.assi_seqn			= 1;
			param.file_dvcd_1fst	= '3100';
			Ext.merge(param, this.params);
			uploadForm.getForm().setValues({
				param : JSON.stringify(param)
			});
			uploadForm.getForm().submit({
				waitMsg:this.waitMsg, // progressbar 띄우기
				success:function(form, action){
					editor.down('[name=imge_info]').down('[name=files]').setValue(null);
					editor.down('[name=imge_info]').down('[name=image]').setSrc('unknown');
				},
				failure: function(form, action) {
					Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
				}
			});
		}
		store.reload();

	},

	//삭제
	deleteAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			store  = lister.getStore(),
			editor = me.pocket.editor()
			records = lister.getSelectionModel().getSelection()
		;

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/item/fabcmast/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							fabc_idcd	: records[0].data.fabc_idcd
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

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},

	//엑셀2
	exportAction2 : function(){
		this.pocket.detail1().writer({enableLoadMask:true});
	},

	//엑셀3
	exportAction3 : function(){
		this.pocket.detail2().writer({enableLoadMask:true});
	},

	//엑셀4
	exportAction4 : function(){
		this.pocket.detail3().writer({enableLoadMask:true});
	},


});