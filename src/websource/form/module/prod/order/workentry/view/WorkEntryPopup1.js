/**
 */
Ext.define('module.prod.order.workentry.view.WorkEntryPopup1', { extend: 'Axt.popup.Search',

	alias	: 'widget.module-workentry-popup1',
	store	: 'module.prod.order.workentry.store.WorkEntryPopup1',
	requires: [
		'lookup.popup.view.ClassPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.VendPopup'
	],
	title	: Language.get('workentry_popup','자재선택'),
	closable: true,
	autoShow: true,
	width	: 800,
	height	: 500,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this,
			autoSelect = false
		;

		me.items = [me.createForm()];
		me.callParent(arguments);
	},
	listeners:{
		render:function(){
			var store = this.down('grid').getStore(),
				param = Ext.merge( this.down('form').getValues(), { hq_id : _global.hq_id}, this.popup.params ),
				liser1= Ext.ComponentQuery.query('module-workentry-lister1')[0],
				me = Ext.ComponentQuery.query('module-workentry-popup1')[0],
				button = Ext.dom.Query.select('.btnSearch')[0];
			;
			if(param._set=='insert'){
				return;
			}else{
				store.load({
					params : { param:JSON.stringify(param) }, scope:this,
					callback : function(records, operation, success) {
						var ivst_qntt = Ext.ComponentQuery.query('#ivst_qntt')[0];
						ivst_qntt.setValue(param.ivst_qntt);
						var item_name = Ext.ComponentQuery.query('#item_name')[0];
						item_name.setValue(param.item_name);
						var item_idcd = Ext.ComponentQuery.query('#item_idcd')[0];
						item_idcd.setValue(param.item_idcd);
						Ext.get(button).dom.click();
					}
				});
			}
		}
	},

	/**
	 * 화면폼
	 */
	 createForm: function(){
		var	me   = this,
			form = {
				xtype		: 'form-layout',
				region		: 'center',
				border		: false,
				dockedItems : [ me.createLine1() ],
				items		: [ me.createGrid() ]
			}
		;
		return form;
	},
	/**
	 * 검색폼
	 */
	createLine1 : function(){
		var me   = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'top',
				width			: 500,
				bodyStyle		: { padding: '5px' },
				listeners: {
					activate: function(tab){
						var s = Ext.ComponentQuery.query('#editorTool');
						s[0].show();
					}
				},
				fieldDefaults	: { width : 340, labelWidth : 80, labelSeparator : '',labelStyle: 'text-align:right',},
				items	:[
					{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items			: [
							{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '0 0 5 0',
								region	: 'west',
								items	:	[
									{	fieldLabel	: Language.get('item','품목'),
								xtype		: 'popupfield'	,
								editable	: true,
								enableKeyEvents : true,
								name		: 'item_name'	,
								pair		: 'item_idcd'	,
								itemId		:'item_name',
								width		: 300,
								clearable	: false ,
								allowBlank	: false,
								fieldCls	: 'requiredindex',
								emptyText	: Const.invalid.emptyValue,
								popup		: {
									select	: 'SINGLE',
									widget	: 'lookup-item-popup',
									params	: { stor_grp : _global.stor_grp , row_sts : '0' },
									result	: function(records, nameField, pairField) {
										nameField.setValue(records[0].get('item_name'));
										pairField.setValue(records[0].get('item_idcd'));
									}
								}
								},{	name : 'item_idcd', xtype : 'textfield' , hidden : true,itemId:"item_idcd"
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
									items	: [
										{	fieldLabel	: Language.get('ivst_qntt','투입수량'),
											name		: 'ivst_qntt',
											xtype		: 'numericfield',
											width		: 160,
											itemId		: 'ivst_qntt',
											allowBlank	: false,
											fieldCls	: 'requiredindex',
											emptyText	: Const.invalid.emptyValue,
										},{ xtype		: 'textfield',
											hidden		: true,
											name		: '_set'
										},{ xtype		: 'textfield',
											hidden		: true,
											name		: 'invc_numb'
										},{ xtype		: 'numericfield',
											hidden		: true,
											name		: 'line_seqn',
											width		:100
										}
									]
								}
							]
							},{	text		: '<span class="btnTemp btnSearch" style="font-size:1.5em">조회</span>',
								xtype		: 'button',
								width		: 100,
								height		: 60,
								margin		: '0 0 0 360',
								cls			: 'button-style',
								handler		: me.selectAction
							}
						]
					}
				]
			}
		;
		return item;
	},

	createLine2 : function () {
		var me = this,
			line = {
				xtype	: 'container',
				margin	: '0 0 0 0',
				itemId	: 'itemviewer',
				layout	: 'border',
				border	: 1,
				style	: Const.borderLine.top +  Const.borderLine.bottom ,
				height	: 35,
				html	: ''
			}
		;
		return line;
	},

	/**
	 * 품목 데이터를 조회한다.
	 */
	selectItem : function (config) {
		var me		= this,
			panel	= config.panel,
			length	= config.records.length
		;
		Ext.each(config.records, function(record, index) {
			me.attachItem( { panel : config.panel , record : record , append : (length > 1) } );
		});
	},

	/**
	 * 품목 정보를 첨부 시킨다.
	 */
	attachItem : function (config) {
		var me = this,
			clear	= config.clear,
			record	= config.record,
			html	= config.html || ''
		;
		if (config.clear || !config.record) {
			html	= '';
			me.getForm().reset();
			me.down('#itemviewer').update( html );
//			me.down('[name=brcd]').focus(true, 10);
//			me.down('[itemId=unit_name]').update('단위');
		} else {
			me.down('[name=mast_item_idcd]'	).setValue(record.get('mast_item_idcd' ));
			me.down('[name=mast_item_code]'	).setValue(record.get('mast_item_code' ));
			me.down('[name=unit_idcd]'	).setValue(record.get('unit_idcd' ));
			me.down('[name=unit_name]'	).setValue(record.get('unit_name' ));
			me.down('[name=item_idcd]'	).setValue(record.get('item_idcd' ));
			me.down('[name=item_code]'	).setValue(record.get('item_code' ));
			me.down('[name=item_name]'	).setValue(record.get('item_name' ));
			me.down('[name=item_spec]'	).setValue(record.get('item_spec' ));

			if (config.append) {

				me.appendItem( { panel : config.panel });
			} else {
				html = '<div>'
					 + '  <div style = "width: 100;  float : left" >'
					 + '  	<div>계정구분</div><div>'+ record.get('acct_bacd_name') +'</div> '
					 + '  </div> '
					 + '  <div style = "width: 300;  float : left" >'
					 + '  	<div>품목분류</div><div>'+ record.get('clss_name') +'</div> '
					 + '  </div> '
				 	 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>모델명</div><div>'+ record.get('modl_name') +'</div> '
					 + '  </div> '
				 	 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>입고창고</div><div>'+ record.get('istt_wrhs_name') +'</div> '
					 + '  </div> '
				 	 + '  <div style = "width: 150;  float : left" >'
					 + '  	<div>출고창고</div><div>'+ record.get('istt_wrhs_name') +'</div> '
					 + '  </div> '
					 + '</div>'
				;
				me.down('#itemviewer').update( html );
			}
		}
	},

	/**
	 * 입력된 상품을 등록한다.
	 */
	appendItem : function (config) {
		var me			= this,
			store		= me.ownerCt.getStore(),
			editor		= me.ownerCt.editor,
			record		= undefined,
			findrecord	= undefined,
			is_equal	= false,
			uper_seqn   = undefined
		;
		var seq = editor.getSEQ();
		var dsp = '';
		if(me.down('[name=prnt_idcd]').getValue() == '' || me.down('[name=prnt_idcd]').getValue() == '0') {
			dsp = editor.getDSP();
		}
		store.each(function(record){
			uper_seqn = record.get('line_seqn');
		})
		if (uper_seqn == undefined) {
			uper_seqn = me.down('[name=prnt_idcd]').getValue();
		}

		record = Ext.create( store.model.modelName , {
			bomt_seqn		: seq,
			line_seqn		: seq,
			uper_seqn		: uper_seqn,
			disp_seqn		: dsp,
			prnt_idcd		: uper_seqn,
			prnt_item_idcd	: me.down('[name=item_idcd]').getValue(),
			item_idcd		: me.down('[name=item_idcd]').getValue(),
			item_code		: me.down('[name=item_code]').getValue(),
			item_name		: me.down('[name=item_name]').getValue(),
			item_spec		: me.down('[name=item_spec]').getValue(),
			unit_idcd		: me.down('[name=unit_idcd]').getValue(),
			unit_name		: me.down('[name=unit_name]').getValue(),
			wkct_name		: me.down('[name=wkct_name]').getValue(),
			ndqt_nmrt		: me.down('[name=ndqt_nmrt]').getValue(),
			ndqt_dnmn		: me.down('[name=ndqt_dnmn]').getValue(),
			incm_loss_rate	: me.down('[name=incm_loss_rate]').getValue(),
			remk_text		: me.down('[name=remk_text]').getValue(),
			istt_wrhs_idcd	: '',
			vatx_incl_yorn	: '',
			orig_invc_numb	: '',
			ivst_wkct_idcd	: me.down('[name=wkct_idcd]').getValue(),
//			orig_seqn		: 0

		});
		store.each(function(findrecord) {
			if (   findrecord.get('item_idcd') == record.get('item_idcd')
				&& findrecord.get('item_code') == record.get('item_code')
				&& findrecord.get('item_name') == record.get('item_name')
				&& findrecord.get('item_spec') == record.get('item_spec')
				&& findrecord.get('unit_idcd') == record.get('unit_idcd')
				&& findrecord.get('unit_name') == record.get('unit_name')
				&& findrecord.get('deli_date') == record.get('deli_date')) {
				is_equal = true;
				// 상품의 수량을 추가
				findrecord.set("ndqt_nmrt", findrecord.get('ndqt_nmrt') + record.get('ndqt_nmrt'));
				findrecord.set("ndqt_dnmn", findrecord.get('ndqt_dnmn') + record.get('ndqt_dnmn'));
				findrecord.set("incm_loss_rate", findrecord.get('incm_loss_rate') + record.get('incm_loss_rate'));
			}
		});

		// 상품을 추가
		if (!is_equal) {
			store.add(record);
		}

		me.attachItem({ clear : true });
	},


	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	 createGrid: function(){
			var me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me, { msg: Const.SELECT.mask })
				},
				store	: Ext.create(me.store),
				paging	: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close, cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex:	'lott_numb'	, width:  150 , text: Language.get( 'lott_numb'		, 'lot번호'	)	, align : 'center'
					},{	dataIndex:	'qntt'		, width:  100 , text: Language.get( 'qntt'			, '입고수량'	)	, xtype:'numericcolumn'
					},{	dataIndex:	'stok_qntt'	, width:  100 , text: Language.get( 'stok_qntt'		, '재고수량'	)	, xtype:'numericcolumn'
					},{	dataIndex:	'ivst_qntt'	, width:  100 , text: Language.get( 'ivst_qntt'		, '투입수량'	)	, xtype:'numericcolumn'
					}
				],
				listeners: {
					load: function(store, records, success) {
						store.load({});
					},
					itemdblclick: function(dataview, index, item, e) {
						return;
					},
					render: function(){
						var me = this
						;
						new Ext.util.KeyMap({
							target: me.getEl(),
							eventName : 'keyup',
							binding: [{ key: Ext.EventObject.ENTER ,fn: function(key,e) { me.fireEvent('itemdblclick', me.getView() ); }}]
						});
					}
				}
			};
		return grid;
	},

	/**
	 * 조회
	 */
	selectAction: function(){
		var me = this,
			upperGrid = me.up('window').down('grid');
			store = upperGrid.getStore(),
			param = Ext.merge( me.up('form').getValues(), me.up('window').params , {hq_id : _global.hq_id}),
			ivst_qntt =0,
			window = me.up('window')
			;
			if(Ext.ComponentQuery.query('#ivst_qntt')[0].getValue()){
				ivst_qntt		= Ext.ComponentQuery.query('#ivst_qntt')[0].getValue();
				param.item_idcd	=Ext.ComponentQuery.query('#item_idcd')[0].getValue();
				param.item_name	=Ext.ComponentQuery.query('#item_name')[0].getValue();
				param.ivst_qntt	=Ext.ComponentQuery.query('#ivst_qntt')[0].getValue();

			}else{
				ivst_qntt = param.ivst_qntt;
			}
			me.up('form').down('[name=invc_numb]').setValue(window.param.invc_numb);
			me.up('form').down('[name=_set]').setValue(window.param._set);
			me.up('form').down('[name=line_seqn]').setValue(window.param.line_seqn);
		if(param.item_idcd == null || param.item_idcd == '' || param.ivst_qntt == null || param.ivst_qntt == ''){
			return;
		}
		if ( me.up('window').apiurl &&  me.up('window').apiurl.search ) {
			store.getProxy().api.read =  me.up('window').apiurl.search ;
		}
		store.load({
			params   : {param:JSON.stringify(param)},
			scope    : me,
			callback : function(records, operation, success) {
				if (success && records.length === 1) {
					me.finishAction(records);
				} else {
					if(!me.autoShow) {
						var sum_qntt=0;
						for(var i = 0; i<records.length;i++){
							sum_qntt = sum_qntt+records[i].data.qntt;
							if((records[i].data.qntt - ivst_qntt)<0){
								records[i].data.stok_qntt = 0;
								records[i].data.ivst_qntt = records[i].data.qntt;
								ivst_qntt =ivst_qntt - records[i].data.qntt;
							}else if((records[i].data.qntt - ivst_qntt)>0){
								records[i].data.stok_qntt = records[i].data.qntt - ivst_qntt;
								records[i].data.ivst_qntt = ivst_qntt;
								break;
							}
						}
						if(sum_qntt < ivst_qntt){
							me.up('form').down('[name=ivst_qntt]').setValue(sum_qntt);
						}
						store.removeAll();
						store.add(records);
//						me.autoShow = !me.autoShow;
//						me.show();
					}
				}
			}
		});
	},

	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function( records ){
		var me = this,
			store = this.down('grid').getStore(),
			editor = me.down('form'),
			grid	= me.down('grid'),
			lott_numb = store.data.items[0].data.lott_numb,
			store2 = Ext.ComponentQuery.query('module-workentry-lister1')[0].getStore()
		;
		var param = Ext.merge( this.down('form').getValues() );
		if(param.item_idcd == null || param.item_idcd==""||param.ivst_qntt==""||param.ivst_qntt==null||param.invc_numb==null||param.invc_numb==""){
			Ext.Msg.alert("알림","품목 조회가 필요합니다.")
			return;
		}else{
			var record = {
				item_idcd		: param.item_idcd,
				invc_numb		: param.invc_numb,
				ivst_qntt		: param.ivst_qntt,
				lott_numb		: lott_numb,
				line_seqn		: param.line_seqn
			};
			store.removeAll();
			store.removed = [];
			store.add(record);
			store.sync({
				callback: function(batch, options) {
					store2.reload();
					this.close();
				} ,
				scope: this
			},{	synchro : _global.objects.synchro,_set: param._set,} );
		}
	}
});

