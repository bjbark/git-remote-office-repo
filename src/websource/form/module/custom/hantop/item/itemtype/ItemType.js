Ext.define('module.custom.hantop.item.itemtype.ItemType', { extend:'Axt.app.Controller',

	models:[
		'module.custom.hantop.item.itemtype.model.ItemTypeMaster',
	],
	stores:[
		'module.custom.hantop.item.itemtype.store.ItemTypeMaster',
	],
	views: [
		'module.custom.hantop.item.itemtype.view.ItemTypeLayout',
		'module.custom.hantop.item.itemtype.view.ItemTypeSearch',
		'module.custom.hantop.item.itemtype.view.ItemTypeMaster',
		'module.custom.hantop.item.itemtype.view.ItemTypeEditor'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-itemtype-layout button[action=selectAction]' : { click : me.selectAction },	// 조회

			'module-itemtype-master button[action=insertAction]' : { click : me.insertAction }, // 추가
			'module-itemtype-master button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-itemtype-master button[action=deleteAction]' : { click : me.deleteAction },	// 삭제

			'module-itemtype-master button[action=exportAction]' : { click : me.exportAction}, // 엑셀

			'module-itemtype-editor button[action=updateAction]' : { click : me.updateAction },	// 저장
			'module-itemtype-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소

			'module-itemtype-master' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},

	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-itemtype-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-itemtype-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-itemtype-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-itemtype-master')[0] },
	},

	//조회
	selectAction:function() {
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
					console.log(lister.getSelectionModel());
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	attachRecord:function(){
		var	me = this,
			lister = me.pocket.lister()
		;

		// 선택초기화
		lister.getStore().clearData();
		lister.getStore().loadData([],false);

	},

	//선택
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.down('[title=이미지]').down('[name=image]').setSrc(null);
		editor.down('[title=이미지]').down('[name=image2]').setSrc(null);
		editor.down('[title=이미지]').down('[name=image3]').setSrc(null);
		editor.down('[title=이미지]').down('[name=image4]').setSrc(null);
		editor.down('[title=이미지]').down('[name=image5]').setSrc(null);
		editor.down('[title=이미지]').down('[name=image6]').setSrc(null);
		editor.down('[title=이미지]').down('[name=image7]').setSrc(null);


		if(record[0]){
			editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hantop/item/itemtype/get/image.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						wdtp_idcd	: record[0].get('wdtp_idcd'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
						console.log('error');
					} else {
						var imge_1fst = result.records[0].imge_1fst;
						var imge_2snd = result.records[0].imge_2snd;
						var imge_3trd = result.records[0].imge_3trd;
						var imge_4frt = result.records[0].imge_4frt;
						var imge_5fit = result.records[0].imge_5fit;
						var imge_6six = result.records[0].imge_6six;
						var imge_7svn = result.records[0].imge_7svn;

						if(imge_1fst != undefined && imge_1fst != ''){
							var x = imge_1fst.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image]').setSrc(url);
						}
						if(imge_2snd != undefined && imge_2snd != ''){
							var x = imge_2snd.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image2]').setSrc(url);
						}
						if(imge_3trd != undefined && imge_3trd != ''){
							var x = imge_3trd.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image3]').setSrc(url);
						}
						if(imge_4frt != undefined && imge_4frt != ''){
							var x = imge_4frt.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image4]').setSrc(url);
						}
						if(imge_5fit != undefined && imge_5fit != ''){
							var x = imge_5fit.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image5]').setSrc(url);
						}
						if(imge_6six != undefined && imge_6six != ''){
							var x = imge_6six.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image6]').setSrc(url);
						}
						if(imge_7svn != undefined && imge_7svn != ''){
							var x = imge_7svn.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image7]').setSrc(url);
						}

					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},


	//수정
	modifyAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			select = lister.getSelectionModel().getSelection()[0]
		;
		editor.down('[title=이미지]').down('[name=image]').setSrc('');
		editor.down('[title=이미지]').down('[name=image2]').setSrc('');
		editor.down('[title=이미지]').down('[name=image3]').setSrc('');
		editor.down('[title=이미지]').down('[name=image4]').setSrc('');
		editor.down('[title=이미지]').down('[name=image5]').setSrc('');
		editor.down('[title=이미지]').down('[name=image6]').setSrc('');
		editor.down('[title=이미지]').down('[name=image7]').setSrc('');

		if(select){
			editor.modifyRecord({
				caller   : me,
				callback : function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true } );
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hantop/item/itemtype/get/image.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd,
						wdtp_idcd	: select.get('wdtp_idcd'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						var imge_1fst = result.records[0].imge_1fst;
						var imge_2snd = result.records[0].imge_2snd;
						var imge_3trd = result.records[0].imge_3trd;
						var imge_4frt = result.records[0].imge_4frt;
						var imge_5fit = result.records[0].imge_5fit;
						var imge_6six = result.records[0].imge_6six;
						var imge_7svn = result.records[0].imge_7svn;

						if(imge_1fst != undefined && imge_1fst != ''){
							var x = imge_1fst.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image]').setSrc(url);
						}
						if(imge_2snd != undefined && imge_2snd != ''){
							var x = imge_2snd.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image2]').setSrc(url);
						}
						if(imge_3trd != undefined && imge_3trd != ''){
							var x = imge_3trd.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image3]').setSrc(url);
						}
						if(imge_4frt != undefined && imge_4frt != ''){
							var x = imge_4frt.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image4]').setSrc(url);
						}
						if(imge_5fit != undefined && imge_5fit != ''){
							var x = imge_5fit.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image5]').setSrc(url);
						}
						if(imge_6six != undefined && imge_6six != ''){
							var x = imge_6six.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image6]').setSrc(url);
						}
						if(imge_7svn != undefined && imge_7svn != ''){
							var x = imge_7svn.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image7]').setSrc(url);
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}else{
			Ext.Msg.alert('알림','창호형태를 선택해주세요.');
			return;
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			select = lister.getSelectionModel().getSelection()[0]
		;
			editor.down('[name=imge_info]').down('[name=image]').setSrc(null);
			editor.down('[name=imge_info]').down('[name=image2]').setSrc(null);
			editor.down('[name=imge_info]').down('[name=image3]').setSrc(null);
			editor.down('[name=imge_info]').down('[name=image4]').setSrc(null);
			editor.down('[name=imge_info]').down('[name=image5]').setSrc(null);
			editor.down('[name=imge_info]').down('[name=image6]').setSrc(null);
			editor.down('[name=imge_info]').down('[name=image7]').setSrc(null);
			editor.insertBefore({
				caller	: me,
				keygen	: {
					url			: _global.location.http() + '/listener/seq/maxid.do',
					object		: resource.keygen,
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'wind_type'
						})
					}
				},
				callback : function (keygen){
					if (keygen.success){
						editor.insertRecord({
							caller	: me,
							record	: Ext.create( lister.getStore().model.modelName,{
								wdtp_idcd : keygen.records[0].seq,
								line_stat : '0'
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

	/* 저장 */
	updateAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			store  = lister.getStore()
		;
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if (results.success) {
					if (record.phantom && Ext.isEmpty(record.get('wdtp_idcd'))) {
						resource.keygen({
							url			: _global. location.http () + '/listener/seq/maxid.do',
							object		: resource. keygen,
							params		: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id		: _global.stor_id,
									table_nm	: 'wind_type'
								})
							 },
							async	: false,
							callback: function( keygen ) {
								if (keygen.success) {
									record.dirtyValue('wdtp_idcd' , keygen.records[0].seq );
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
							var	uploadForm = editor.down('[name=uploadForm]'),
								select    = lister.getSelectionModel().getSelection()[0],
								imge_1fst = editor.down('[name=image]').src,
								imge_2snd = editor.down('[name=image2]').src,
								imge_3trd = editor.down('[name=image3]').src,
								imge_4frt = editor.down('[name=image4]').src,
								imge_5fit = editor.down('[name=image5]').src,
								imge_6six = editor.down('[name=image6]').src,
								imge_7svn = editor.down('[name=image7]').src,

								chek1	   = editor.down('[name=imge_chek1]').getValue(),
								chek2	   = editor.down('[name=imge_chek2]').getValue(),
								chek3	   = editor.down('[name=imge_chek3]').getValue(),
								chek4	   = editor.down('[name=imge_chek4]').getValue(),
								chek5	   = editor.down('[name=imge_chek5]').getValue(),
								chek6	   = editor.down('[name=imge_chek6]').getValue(),
								chek7	   = editor.down('[name=imge_chek7]').getValue(),
								param={},
								chk1=0, chk2=0, chk3=0, chk4=0, chk5=0, chk6=0, chk7=0
								wdtp_idcd  = editor.down('[name=wdtp_idcd]').getValue();
							;

							if(imge_1fst){
								if(chek1 == "" || chek1 == undefined){
									chk1 = 3;
								}
								else{
									chk1 = 1;
								}
							}
							if(imge_2snd){
								if(chek2 == "" || chek2 == undefined){
									chk2 = 3;
								}else{
									chk2 = 1;
								}
							}
							if(imge_3trd){
								if(chek3 == "" || chek3 == undefined){
									chk3 = 3;
								}
								else{
									chk3 = 1;
								}
							}
							if(imge_4frt){
								if(chek4 == "" || chek4 == undefined){
									chk4 = 3;
								}else{
									chk4 = 1;
								}
							}
							if(imge_5fit){
								if(chek5 == "" || chek5 == undefined){
									chk5 = 3;
								}
								else{
									chk5 = 1;
								}
							}
							if(imge_6six){
								if(chek6 == "" || chek6 == undefined){
									chk6 = 3;
								}else{
									chk6 = 1;
								}
							}
							if(imge_7svn){
								if(chek7 == "" || chek7 == undefined){
									chk7 = 3;
								}else{
									chk7 = 1;
								}
							}

							param.stor_grp  = _global.stor_grp;
							param.stor_id = _global.stor_id;
							param.wdtp_idcd = wdtp_idcd;
							param.chk1		= chk1;
							param.chk2		= chk2;
							param.chk3		= chk3;
							param.chk4		= chk4;
							param.chk5		= chk5;
							param.chk6		= chk6;
							param.chk7		= chk7;

							Ext.merge(param, this.params);
							uploadForm.getForm().setValues({
								param : JSON.stringify(param)
							});
						//submit
							uploadForm.getForm().submit({
								waitMsg:this.waitMsg, // progressbar 띄우기
								success:function(form, action){
								},
								failure: function(form, action) {
									Ext.Msg.alert( '', '이미지 업로드 실패 했습니다.' );
								}
							});
							results.feedback({success : true });
						},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({});}
					});
				}
			},

			finished : function(results, record, operation){
				if (results.success) {
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : lister.getSelectionModel().select(record); break;
					}
					lister.getStore().reload();
				}
			}
		});

	},

	//취소
	cancelAction:function() {
		var	me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.lister(),
			select = lister.getSelectionModel().getSelection()[0]
		;
		editor.down('[name=imge_info]').down('[name=image]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image2]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image3]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image4]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image5]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image6]').setSrc('');
		editor.down('[name=imge_info]').down('[name=image7]').setSrc('');

		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true});
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		if(select){
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/hantop/item/itemtype/get/image.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id		: _global.stor_id,
						hqof_idcd	: _global.hqof_idcd,
						wdtp_code	: select.get('wdtp_code'),
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						Ext.Msg.error(result.message );
					} else {
						var imge_1fst = result.records[0].imge_1fst;
						var imge_2snd = result.records[0].imge_2snd;
						var imge_3trd = result.records[0].imge_3trd;
						var imge_4frt = result.records[0].imge_4frt;
						var imge_5fit = result.records[0].imge_5fit;
						var imge_6six = result.records[0].imge_6six;
						var imge_7svn = result.records[0].imge_7svn;

						if(imge_1fst != undefined && imge_1fst != ''){
							var x = imge_1fst.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image]').setSrc(url);
						}
						if(imge_2snd != undefined && imge_2snd != ''){
							var x = imge_2snd.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image2]').setSrc(url);
						}
						if(imge_3trd != undefined && imge_3trd != ''){
							var x = imge_3trd.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image3]').setSrc(url);
						}
						if(imge_4frt != undefined && imge_4frt != ''){
							var x = imge_4frt.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image4]').setSrc(url);
						}
						if(imge_5fit != undefined && imge_5fit != ''){
							var x = imge_5fit.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image5]').setSrc(url);
						}
						if(imge_6six != undefined && imge_6six != ''){
							var x = imge_6six.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image6]').setSrc(url);
						}
						if(imge_7svn != undefined && imge_7svn != ''){
							var x = imge_7svn.toString();
							var img = new Uint8Array(x.split(",")),
							blob = new Blob([img],{type:'image/png'}),
							url = URL.createObjectURL(blob);
							editor.down('[title=이미지]').down('[name=image7]').setSrc(url);
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
		}
	},

	//삭제
	deleteAction:function() {
		var me = this,
			editor = me.pocket.editor();
			editor.deleteRecord({
			lister	: me.pocket.lister(),
			callback: function(results, record, store) {
				store.sync({																					// 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });},		// 저장 성공시
					failure : function(operation){ results.feedback({success : false }); },						// 저장 실패시 호출
					callback: function(operation){ results.callback({}); }										// 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			lister : me.pocket.lister(),
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
		editor.down('[title=이미지]').down('[name=image]').setSrc('') ;
		editor.down('[title=이미지]').down('[name=image2]').setSrc('');
		editor.down('[title=이미지]').down('[name=image3]').setSrc('');
		editor.down('[title=이미지]').down('[name=image4]').setSrc('');
		editor.down('[title=이미지]').down('[name=image5]').setSrc('');
		editor.down('[title=이미지]').down('[name=image6]').setSrc('');
		editor.down('[title=이미지]').down('[name=image7]').setSrc('');

	},

	//엑셀
	exportAction : function(field){
		var	me		= this,
		lister	= me.pocket.lister()
		;

		lister.writer({enableLoadMask:true});

	}
});
