Ext.define('module.item.colormix.ColorMix', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.ItemPopup'
	],

	models	: [
		'module.item.colormix.model.ColorMixMaster',
		'module.item.colormix.model.ColorMixDetail',
		'module.item.colormix.model.ColorMixItem'
	],
	stores	: [
		'module.item.colormix.store.ColorMixMaster',
		'module.item.colormix.store.ColorMixDetail',
		'module.item.colormix.store.ColorMixItem'
	],
	views	: [
		'module.item.colormix.view.ColorMixLayout',
		'module.item.colormix.view.ColorMixSearch',
		'module.item.colormix.view.ColorMixListerMaster',
		'module.item.colormix.view.ColorMixListerDetail',
		'module.item.colormix.view.ColorMixEditor',
		'module.item.colormix.view.ColorMixItemLister',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-colormix-layout button[action=selectAction]'        : { click : me.selectAction },	// 조회
			// lister master event
			'module-colormix-lister-master button[action=modifyAction]'  : { click : me.modifyAction },	// 수정
			'module-colormix-lister-master button[action=insertAction]'  : { click : me.insertAction },	// 신규
			'module-colormix-lister-master button[action=deleteAction]'  : { click : me.deleteAction },	// 삭제
			'module-colormix-lister-master button[action=exportAction]'  : { click : me.exportAction },	// 엑셀
			'module-colormix-lister-master button[action=printAction]'   : { click : me.printAction },	// 착색정보발행
			'module-colormix-lister-master' : {
				itemdblclick    : me.selectDetail ,
				selectionchange : me.attachRecord
			},
			// lister detail event
			'module-colormix-lister-detail button[action=exportAction]'  : { click : me.exportAction1},	// 엑셀
			// editer event
			'module-colormix-editor button[action=updateAction]'         : { click : me.updateAction },	// 저장
			'module-colormix-editor button[action=cancelAction]'         : { click : me.cancelAction },	// 취소
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-colormix-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-colormix-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-colormix-lister-master')[0] },
		listerdetail: function () { return Ext.ComponentQuery.query('module-colormix-lister-detail')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-colormix-editor')[0] },
		itemlister	: function () { return Ext.ComponentQuery.query('module-colormix-item-lister')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		if(param.dwup_date1>param.dwup_date2){
			Ext.Msg.alert("알림","작성일자를 다시 입력하여주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listermaster = me.pocket.listermaster();
			listermaster.select({
				callback:function(records, operation, success) {
					if (success) {
						listerdetail.getSelectionModel().select(0);
					} else { me.pocket.editor().getForm().reset(true);
					}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	attachRecord:function( smodel, record ){
		var me	= this,
			detail   = me.pocket.listerdetail(),
			master   = me.pocket.listermaster(),
			item     = me.pocket.itemlister(),
			editor   = me.pocket.editor(),
			select   = me.pocket.listermaster().getSelectionModel().getSelection()[0]
			search   = me.pocket.search(),
			param    = search.getValues()
		;
		me.pocket.listerdetail().eraser() ;

		if (select) {
			editor.attachRecord({
				caller : me ,
				lister : master ,
				record : record ? record : master.getSelectionModel().getSelection(),
				callback : function (results , record ) {
					if (results.success) {
					}
				}
			});

			item.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge({stor_id : _global.stor_id , prnt_item_idcd : select.get('prnt_item_idcd'), chge_degr: select.get('chge_degr'), kg : param.kg}));
		}
	},


	//선택
	selectDetail : function(grid, record) {
		var me = this,
			detail     = me.pocket.listerdetail(),
			master     = me.pocket.listermaster(),
			item       = me.pocket.itemlister(),
			editor     = me.pocket.editor(),
			select     = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			search     = me.pocket.search(),
			param      = search.getValues()
		;
		if (record){
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, {	prnt_item_idcd	: record.get('prnt_item_idcd'),
					chge_degr		: record.get('chge_degr'),
					kg				: param.kg
			});

			item.select({
				callback:function(records, operation, success) {
				if (success) {
				} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, Ext.merge({stor_id : _global.stor_id , prnt_item_idcd : record.get('prnt_item_idcd'),chge_degr : record.get('chge_degr'), kg : param.kg}));
		}
	},

	//수정
	modifyAction:function() {
		var me = this,
			editor       = me.pocket.editor(),
			listermaster = me.pocket.listermaster(),
			select       = me.pocket.listermaster().getSelectionModel().getSelection()[0]
		;
		if(select){
			editor.modifyRecord({
				caller	: me,
				callback: function( results ) {
					if (results.success){
						results.feedback( {success : true, visible : true });
						me.pocket.layout().down('#mainpanel').setDisabled(true);
						me.pocket.search().setDisabled(true);
					}
				}
			});
		}else{
			Ext.Msg.alert("알림","수정할 데이터를 선택하여주십시오.");
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			search        = me.pocket.search(),
			listermaster  = me.pocket.listermaster(),
			listerdetail  = me.pocket.listerdetail(),
			item          = me.pocket.itemlister(),
			editor        = me.pocket.editor(),
			param         = search.getValues(),
			select        = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			mrecord       = mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0]

		;
		item.getStore().clearData();
		item.getStore().loadData([],false);

		editor.insertRecord({
			action		: Const.EDITOR.DEFAULT,
			record		: Ext.create( listermaster.getStore().model.modelName,{}),
			disables	: [ me.pocket.layout().down('#mainpanel'),me.pocket.search().setDisabled(true)],
			callback	: function (results){
				if (results.success) {
					results.feedback({success : true });
				}
			},
			finished : function(results, record){
				if (results.success){
					editor.expand(false);
				}
			}
		});
	},

	updateAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			listerdetail = me.pocket.listerdetail(),
			editor       = me.pocket.editor(),
			store        = listermaster.getStore(),
			item_store   = me.pocket.itemlister().getStore(),
			select       = me.pocket.listermaster().getSelectionModel().getSelection()[0],
			search       = me.pocket.search(),
			param        = search.getValues()
		;
		editor.updateRecord({
			store	: store,
			action	: Const.EDITOR.DEFAULT,
			before	: function(results, record) {
				if	(results.success) {
					if	(record.phantom && Ext.isEmpty(record.get('prnt_item_idcd'))) {
						resource.keygen({
							url		: _global. location.http () + '/listener/seq/maxid.do',
							object	: resource. keygen,
							params	: {
								token	: _global. token_id ,
								param	: JSON. stringify({
									stor_id	: _global.stor_id,
									table_nm: 'mix_item'
								})
							},
							async  : false,
							callback : function( keygen ) {
								if (keygen.success) {
									results.feedback({success : true  });
								} else {
									Ext.Msg.alert("error", keygen.message  );
									return;
								}
							}
						});
					} else {
						results.feedback({success : true }); }
				}
			},
			callback : function(results, record ) {
				console.log(results);
				if (results.success) {

					store.sync({
						success : function(operation){ results.feedback({success : true  });},
						failure : function(operation){ results.feedback({success : false });},
						callback: function(operation){ results.callback({}); }
					});
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.pocket.layout().down('#mainpanel').setDisabled(false);
					me.pocket.search().setDisabled(false);
					editor.collapse(false);
					switch (operation) {
						case Const.EDITOR.PROCESS.INSERT : listermaster.getSelectionModel().select(record ); break;
					}
					listermaster.select({
						callback:function(records, operation, success) {
							if (success) {
								listerdetail.getSelectionModel().select(0);
							} else { me.pocket.editor().getForm().reset(true);
							}
							mask.hide();
						}, scope:me
					}, Ext.merge( param, {stor_id : _global.stor_id}) );
				}
			}
		});
		item_store.sync();
	},

	//삭제
	deleteAction : function() {
		var me = this,
			editor       = me.pocket.editor(),
			listerdetail = me.pocket.listerdetail(),
			listermaster = me.pocket.listermaster()
		;
		editor.deleteRecord({
			lister : me.pocket.listermaster(),
			callback: function(results, record, store) {
				store.sync({ // 저장 성공시
					success : function(operation){ results.feedback({success : true , visible : false });}, // 저장 성공시
					failure : function(operation){ results.feedback({success : false }); }, // 저장 실패시 호출
					callback: function(operation){ results.callback({}); } // 성공 실패 관계 없이 호출된다.
				});
			}
		}, me);
	},

	//취소
	cancelAction:function() {
		var me = this,
			editor = me.pocket.editor(),
			lister = me.pocket.listerdetail(),
			item   = me.pocket.itemlister()
		;
		editor.cancelRecord({
			caller : me,
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
		editor.attachRecord({
			caller : me ,
			lister : lister ,
			callback : function (results , record ) {
				if (results.success) {
				}
			}
		});
	},

	//착색정보발행
	printAction:function(){
		var me = this,
			listermaster = me.pocket.listermaster(),
			jrf = 'DooinColormix.jrf',
			resId = _global.hq_id.toUpperCase(),
			records = listermaster.getSelectionModel().getSelection(),
			record = listermaster.getSelectionModel().getSelection()[0]
		;
		if(!record){
			Ext.Msg.alert('알림','품목을 선택하여주십시오.');
		}else{
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 60,
					labelStyle: 'text-align:right',
					width		: 280,
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '생산수량을 입력하여 주십시오.',
						height		: 30,
						margin		: '0 0 0 10'
					},{	fieldLabel	: Language.get('qntt','생산수량'),
						xtype		: 'numericfield',
						name		: 'qntt',
						value		: 0,
						labelWidth	: 110,
						width		: 210,
					},
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:1em">예</span>',
						cls: 'button-style',
						handler: function() {
							var me = this,
								param = Ext.merge( this.up('form').getValues() )
								prnt_item_idcd = records[0].get('prnt_item_idcd'),
								chge_degr = records[0].get('chge_degr'),
								qntt = param.qntt,
								arg = 'prnt_item_idcd~'+prnt_item_idcd+'~'+'chge_degr~'+chge_degr+'~'+'qntt.'+qntt+'~',
								url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}'
							;
							Ext.Msg.confirm("확인", "생산수량이 "+qntt+" 개 맞습니까?", function(button) {
								if (button == 'yes') {
									Ext.Ajax.request({
										url	:  window.open(_global.location.http()+encodeURI(url),'test','width=1200,height=600'),
									});
								}
							});
						}
					},
					{	text: '<span class="btnTemp" style="font-size:1em">아니오</span>',
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				],
			});

			win = Ext.widget('window', {
				title: '착색정보 발행',
				closeAction: 'hide',
				width: 320,
				height: 150,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: 'qntt'
			});
			win.show();
		}
	},

	// 착색정보 발행
	printAction1:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			jrf = 'DooinColormix.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = listermaster.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "발행할 품목을 선택하여주십시오.");
			return;
		}
		var win = window.open(_global.location.http()+'/testcall/ubitest.do?param={\"jrf\" : \"'+jrf+'\",\"resId\" : \"'+resId+'\"}','test','width=1000,height=600');
		return win;
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listermaster().writer({enableLoadMask:true});
	},

	// 엑셀
	exportAction1 : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	}
});