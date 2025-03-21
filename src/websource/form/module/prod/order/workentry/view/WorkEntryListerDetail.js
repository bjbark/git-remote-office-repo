Ext.define('module.prod.order.workentry.view.WorkEntryListerDetail', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-detail'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workentry.store.WorkEntryDetail',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.hq_id+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				cls: _global.hq_id+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태')			, flex : 1 , xtype : 'lookupcolumn', lookupValue : [["0","대기"],["1","예정"],["2","지"]], align : 'center'
					},{ dataIndex: 'idcd'			, text : Language.get('idcd'			,'지시번호')		, flex : 2 , align : 'center'
					},{ dataIndex: 'invc_date'		, text : Language.get('invc_date'		,'지시일자')		, flex : 2 ,align:'center', hidden:true
					},{ dataIndex: 'sttm'			, text : Language.get('sttm'			,'시작시간')		, flex : 2 ,align : 'center',
					},{ dataIndex: 'edtm'			, text : Language.get('edtm'			,'종료시간')		, flex : 2 , align : 'center'
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격')			, flex : 2 , hidden:true
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량')		, flex : 2 ,xtype:'numericcolumn',hidden : true
					},{ dataIndex: 'deli_date'		, text : Language.get('deli_date'		,'납기일자')		, flex : 2 ,align : 'center', hidden:true
					},{ dataIndex: 'pjod_idcd'		, text : Language.get('pjod_idcd'		,'금형번호')		, flex : 2
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명')			, flex : 5
					},{ dataIndex: 'user_name'		, text : Language.get('wker_name'		,'작업자')		, flex : 2
					},{ dataIndex: 'work_date'		, text : Language.get('work_date'		,'작업일자')		, flex : 2,hidden:true
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')			, flex : 2,hidden:true
					},{ dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'진행상태구분코드')	, flex : 2,hidden:true
					},{ header: 'action',
						flex : 3,
						sortable: false,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
									Ext.widget('button', {
										width:100,
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;">중단</span>',
										cls:'btn btn-warning btnTemp '+_global.hq_id+'button',
										handler:  function(){me.stop(rec)},
									});
									Ext.widget('button', {
										width:100,
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:2em;">종료<span>',
										cls:'btn btn-danger btnTemp '+_global.hq_id+'button',
										handler:  function(){me.end(rec)},
									});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
			}
		;
		return item;
	},
	insert : function (rec) {
		var search = Ext.ComponentQuery.query('module-workentry-search')[0],
			searchDate = search.down('[name=today]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workentry-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-workentry-detail')[0].getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						value		: searchDate,
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						listeners:{
						}
					},{	fieldLabel	: Language.get('work_sttm','시작시간'),
						name		: 'work_sttm',
						xtype		: 'timefield',
						format		: 'H:i',
						hideTrigger	: true,
						value		: new Date(),
						minValue: '00:00 AM',
						maxValue: '23:59 PM',
						width		: 533,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
					},{	fieldLabel	: Language.get('wker_idcd_1fst','작업자'),
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_1fst',
						pair		: 'wker_idcd_1fst',
						trigger1Cls : _global.hq_id+'searchTrigger',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_1fst', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name',' '),
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_2snd',
						trigger1Cls : _global.hq_id+'searchTrigger',
						pair		: 'wker_idcd_2snd',
						margin		: '0 0 20 0',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_2snd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name',' '),
						value		: '',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.hq_id+'searchTrigger',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_3trd',
						pair		: 'wker_idcd_3trd',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_3trd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cstm_name','설비'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cvic_name',
						pair		: 'cvic_idcd',
						value		: '',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.hq_id+'searchTrigger',
						popup: {
							select : 'SINGLE',
							widget : 'lookup-wkctcvic-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
							}
						}
					},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var seq;
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/order/workentry/get/getSeqn.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										pjod_idcd		: rec.get('pjod_idcd'),
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
										seq = result.records[0].seq+1;
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								invc_date		: param.work_date,
								wker_idcd_1fst	: param.wker_idcd_1fst,
								wker_idcd_2snd	: param.wker_idcd_2snd,
								wker_idcd_3trd	: param.wker_idcd_3trd,
								work_sttm		: param.work_sttm,
								cvic_idcd		: param.cvic_idcd,
								line_seqn2		: seq
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'insert'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">시작</span>',
				closeAction: 'hide',
				width: 650,
				height: 550,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},
	stop : function (rec) {
		var search = Ext.ComponentQuery.query('module-workentry-search')[0],
			searchDate = search.down('[name=today]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workentry-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-workentry-detail')[0].getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: searchDate,
					},{	fieldLabel	: Language.get('work_edtm','중단시간'),
						name		: 'work_edtm',
						xtype		: 'timefield',
						format		: 'H:i',
						hideTrigger	: true,
						value		: new Date(),
						minValue: '00:00 AM',
						maxValue: '23:59 PM',
						width		: 533,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var seq;
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/order/workentry/get/getSeqn.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										pjod_idcd		: rec.get('pjod_idcd'),
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
										seq = result.records[0].seq;
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								work_edtm		: param.work_edtm,
								invc_date		: param.work_date,
								line_seqn2		: seq
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'stop'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">중단</span>',
				closeAction: 'hide',
				width: 650,
				height: 280,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},
	end : function (rec) {
		var search = Ext.ComponentQuery.query('module-workentry-search')[0],
			searchDate = search.down('[name=today]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-workentry-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-workentry-detail')[0].getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'work_date',
						xtype		: 'datefield',
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.hq_id+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						value		: searchDate,
					},{	fieldLabel	: Language.get('work_edtm','종료시간'),
						name		: 'work_edtm',
						xtype		: 'timefield',
						format		: 'H:i',
						hideTrigger	: true,
						value		: new Date(),
						minValue: '00:00 AM',
						maxValue: '23:59 PM',
						width		: 533,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.hq_id+'label',
						fieldCls	: 'textTemp '+_global.hq_id+'field',
						cls			: 'textTemp'
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var seq;
							Ext.Ajax.request({
								url		: _global.location.http() + '/prod/order/workentry/get/getSeqn.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id			: _global.stor_id,
										hqof_idcd		: _global.hqof_idcd,
										pjod_idcd		: rec.get('pjod_idcd'),
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
										seq = result.records[0].seq;
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								pjod_idcd		: rec.get('pjod_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								work_edtm		: param.work_edtm,
								invc_date		: param.work_date,
								line_seqn2		: seq
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'end'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">종료</span>',
				closeAction: 'hide',
				width: 650,
				height: 280,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
	},

});