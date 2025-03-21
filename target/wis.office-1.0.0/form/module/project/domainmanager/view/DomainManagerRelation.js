Ext.define('module.project.domainmanager.view.DomainManagerRelation', { extend: 'Axt.popup.Search',
	alias   : 'widget.module-domainmanager-relation',
	store   : 'module.project.domainmanager.store.Relation',
	requires: [
		'lookup.popup.project.TablePopup'
	],
	title   : 'Table Relation Manager',
	closable: true,
	autoShow: true,
	width   : 800,
	height  : 508,
	layout  : {
		type: 'border'
	},
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.down('[name=mast_tabl_nm]').setValue(me.popup.values.mast_tabl_nm );
        me.down('[name=mast_tabl]'   ).setValue(me.popup.values.mast_tabl    );
	},
	/**
	 * 화면폼
	 */
	 createForm: function(){
		var  me   = this,
			 form = {
				 xtype       : 'form-layout',
				 region      : 'center',
				 border      : false,
				 dockedItems : [ me.searchForm() ],
				 items       : [ me.createGrid() ]
			}
		;
		return form;
	},
	/**
	 * 검색폼
	 */
	 searchForm: function(){
		var me = this,
			form = {
				xtype		: 'form-search',
//    			bodyStyle: { padding: '0', background: 'transparent' },
				layout       : { type: 'vbox' },
				fieldDefaults: { labelAlign : 'right', height : 22, width : 260, labelWidth : 80, labelSeparator : '' },
				items        : [
					{
						xtype : 'fieldset',
						items : [
							{
								fieldLabel  : 'Mst. Table',
								xtype       : 'popupfield' ,
								editable	: true,
								enableKeyEvents : true,
								name       	: 'mast_tabl_nm'   ,
								pair        : 'mast_tabl'   ,
								allowBlank  : true         ,
								clearable   : true         ,
								width       : 300,
								emptyText   : '',
								popup       : {
									select 	: 'SINGLE',
									widget 	: 'lookup-table-popup' ,
									params 	: {row_sts : '0' },
									result 	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('tabl_name'));
										pairField.setValue(records[0].get('tabl_idcd'));
									}
								}
							},{
								xtype		: 'textfield',
								name		: 'mast_tabl' ,
								hidden		: true
							},{
								fieldLabel  : 'Dtl. Table',
								xtype       : 'popupfield' ,
								editable	: true,
								enableKeyEvents : true,
								name       	: 'dtl_tabl_nm'   ,
								pair        : 'dtil_tabl'   ,
								allowBlank  : true         ,
								clearable   : true         ,
								width       : 300,
								emptyText   : '',
								popup       : {
									select 	: 'SINGLE',
									widget 	: 'lookup-table-popup' ,
									params 	: {row_sts : '0' },
									result 	: function(records, nameField, pairField ){
										nameField.setValue(records[0].get('tabl_name'));
										pairField.setValue(records[0].get('tabl_idcd'));
									}
								}
							},{
								xtype		: 'textfield',
								name		: 'dtil_tabl' ,
								hidden		: true
							},{
								fieldLabel	: 'Status',
								xtype		: 'lookupfield',
								name		: 'row_sts',
						 		lookupValue	: resource.getList('row_sts'),
								width		: 180,
								value		: '0'
							}
						]
					},{	xtype : 'fieldset',
						items : [
							{
								fieldLabel	: 'Relation Name',
								xtype		: 'textfield',
								name		: 'relt_name',
								allowBlank	: false,
								width		: 420
							},{
								fieldLabel	: '관계차수',
								xtype		: 'lookupfield',
								name		: 'relt_type_gbcd',
								lookupValue	: [['1','1:1'],['2','1:M'],['3','N:M']],
								width		: 180,
								value		: '2'
							},{
								fieldLabel	: 'Type',
								xtype		: 'lookupfield',
								name		: 'relt_degr_gbcd',
								lookupValue	: [['1','식별관계'],['2','비식별관계']],
								width		: 180,
								value		: '1'
							}
						]
					},{	xtype : 'fieldset',
						items : [
							{
								fieldLabel	: 'Description',
								xtype		: 'textfield',
								name		: 'desct',
								allowBlank	: false,
								width		: 780
							}
						]
					}
				] // 기타 검색 조건이 필요한 경우
		}
		;
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	 createGrid: function(){
		var  me = this,
			grid = {
				xtype		: 'grid-panel',
				header		: false,
				region		: 'center',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask })
				},
				selModel	:{ selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'MULTI'  },
				features    : [{ ftype : 'grid-summary' , remote : true } ],
				store		: Ext.create( me.store ),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->',
						{xtype: 'button' , text : Const.FINISH.text, iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style'},
						'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close , cls: 'button-style' }
					]
				},
				columns: [
					{	dataIndex: 'tabl_idcd'      , width:  70, text: 'ID Key', hidden: true
					},{	dataIndex: 'fld_seq'     , width:  40, text: 'seq', align: 'right'
					},{	dataIndex: 'fied_idcd'      , width: 120, text: 'Field ID', align: 'left'
					},{	dataIndex: 'fied_name'    , width: 120, text: 'Field Name' , align: 'left'
					},{	dataIndex: 'tabl_name'      , width: 110, text: '테이블명', align: 'left', hidden: true
					},{	dataIndex: 'data_type'   , width:  80, text: 'Type'
					},{	dataIndex: 'data_len'    , width:  40, text: '길이'
					},{	dataIndex: 'key_dvcd'      , width:  60, text: 'Key'
					},{	dataIndex: 'null_dvcd'     , width:  70, text: 'is null'
					},{	dataIndex: 'dflt_valu'    , width:  80, text: 'Default'
					},{	dataIndex: 'ref_table'   , width: 120, text: 'Ref. Table', align: 'left'
					},{	dataIndex: 'inter_val'   , width: 240, text: 'Internal Values', align: 'left'
					},{	dataIndex: 'old_id'      , width: 120, text: '참조ID' , align: 'left', font_color : Const.COLOR.FONT.tax_amt
					},{	dataIndex: 'old_nm'      , width: 380, text: '참조설명' , align: 'left', hidden: true
					},{	dataIndex: 'dscrt'       , flex :   1, text: '참조사항' , align: 'left'
					}
			],
			listeners: {
		}
	}
	;
	return grid;
	},
	/**
	 * 조회
	 */
	selectAction: function(){
		var me    = this,
			store = me.down('grid').getStore(),
			value = me.down('form').getValues()
		;
	},


	/**
	* 공통 품목 전환
	*/
	finishAction: function(){
		var  me     = this,
			panel   = me.down('grid'),
			selects = panel.getSelectionModel().getSelection(),
			store   = panel.getStore(),
			num     = 0,
			id		= '';
			value   = me.down('form').getValues()
		;
		console.debug(value);
		console.debug(value.dtil_tabl);
		if (!value.mast_tabl){
			resource.showError('관계도를 추가할 테이블(Master Table) 을 선택해 주십시오.');
			return;
		}
		if (!value.dtil_tabl){
			resource.showError('관계도를 추가할 테이블(Slave Table)을 선택해 주십시오.');
			return;
		}
		if (!value.relt_name){
			resource.showError('관계도명 입력해 주십시오.');
			return;
		}
		resource.keygen({
			url    : _global. location.http () + '/listener/seq/maxid.do',
			object : resource. keygen,
			params : {
				token : _global. token_id ,
				param : JSON. stringify({
					stor_id         : _global.stor_id,
					table_nm        : 'cret_table_relation'
				})
			 },
			async  : false,
			callback : function( keygen ) {
				if (keygen.success) {
					id = keygen.records[0].seq;
				} else {
					Ext.Msg.alert("error", keygen.message  );
					return;
				}
			}
		});
		Ext.Ajax.request({
			url		: _global. location.http () + "/project/domain/set/relation.do",
			method	: "POST",
			params	: {
				token: _global.token_id,
				param: JSON.stringify({
					relt_idcd			: id,					/* 관계ID		*/
					relt_name          : value.relt_name,			/* 관계명		*/
					mast_tabl       : value.mast_tabl,		/* 마스터 테이블	*/
					dtil_tabl        : value.dtil_tabl,		/* 디테일 테이블	*/
					desct           : value.desct,			/* 설명			*/
					mast_tabl_nm    : value.mast_tabl_nm,	/* 테이블명		*/
					dtl_tabl_nm     : value.dtl_tabl_nm,	/* 테이블명		*/
					relt_type_gbcd   : value.relt_type_gbcd,	/* 관계차수		*/
					relt_degr_gbcd   : value.relt_degr_gbcd,	/* 식별관계		*/
					usr_memo        : '',					/* 사용자메모		*/
					sys_memo        : '',					/* 시스템메모		*/
					row_sts         : value.row_sts,		/* 상태(진행)		*/

				})
			},
			success: function (response, request) {
				var result = Ext.decode(response.responseText);
				if (result.success){
				}else{
				}
			},
			failure: function (response, request) {},
			callback : function() {
			}
		});
		me.setResponse(true);
	},

	/*
	* 신규상품등록 버튼
	*/
    insertAction: function(){
    }
});

