Ext.define('module.custom.symct.prod.workentry.view.WorkEntryListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-symct-workentry-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.symct.prod.workentry.store.WorkEntry',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		var wkctLookup = new Array();

		Ext.Ajax.request({
			url		: _global.location.http() + '/prod/basic/wkctmast/get/lookup.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					rslt_rept_yorn	: '1',
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					for(var i =0; i<result.records.length;i++){
						wkctLookup.push([result.records[i].wkct_idcd,result.records[i].wkct_stnm]);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		me.paging  = me.pagingItem();
		me.columns = me.columnItem(wkctLookup);
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
	listeners:{
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},

	columnItem : function (wkctLookup) {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('assi_seqn'		,'순번'			), width: 80   , align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'height : 48';
							return val;
						}
					},{	dataIndex: 'wkct_idcd'		, text : Language.get('wkct_name'		,'공정'			), width: 120  , align : 'left', xtype : 'lookupcolumn', lookupValue : wkctLookup
					},{	dataIndex: 'work_ordr_dvcd'	, text : Language.get('work_ordr_dvcd'	,'작업구분'		), width: 100  , xtype : 'lookupcolumn', lookupValue	: resource.lookup('work_ordr_dvcd'), align : 'center', hidden : true,
						renderer: function(val,meta,rec) {
							meta.style = 'height : 48';
							return val;
						}
					},{ dataIndex: 'pjod_idcd'		, text : Language.get(''				,'프로젝트코드'	), width: 200  , align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'height : 48';
							return val;
						}
					},{ dataIndex: 'item_idcd'		, text : Language.get('drwg_numb'		,'도면번호'		), width: 220  , align : 'left',
						renderer: function(val,meta,rec) {
							meta.style = 'height : 48';
							return val;
						}
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'제품명'		), flex : 2    , align : 'left',
						renderer: function(val,meta,rec) {
							meta.style = 'height : 48';
							return val;
						}
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'			), flex : 1    , align : 'left', hidden : true,
						renderer: function(val,meta,rec) {
							meta.style = 'height : 48';
							return val;
						}
					},{ dataIndex: 'acpt_qntt'		, text : Language.get('acpt_qntt'		,'수주량'		), width: 100  , align : 'right',
						renderer: function(val,meta,rec) {
							meta.style = 'height : 48';
							return val;
						}
					},{ dataIndex: 'prod_qntt'		, text : Language.get('prod_qntt'		,'생산량'		), width: 100  , align : 'right',
						renderer: function(val,meta,rec) {
							meta.style = 'height : 48';
							return val;
						}
					},{ header: '실행',
						sortable: false,
						width:220,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 220; align : center;';
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										width : 55,
										height: 40,
										text: '<span class="btnTemp" style="font-size:2em !important;text-align : center !important;">▲</span>',
										cls:'btn btn-primary btnTemp'+_global.options.work_book_tema+'button',
										handler: function(){me.exec(rec,'up')}
								});
							}, 50);
							Ext.defer(function() {
								Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										width : 55,
										height: 40,
										text: '<span class="btnTemp" style="font-size:2em !important;text-align : center !important;">▼</span>',
										cls:'btn btn-danger btnTemp'+_global.options.work_book_tema+'button',
										handler: function(){me.exec(rec,'down')}
								});
							}, 50);
							Ext.defer(function() {
								Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										width : 80,
										height: 40,
										text: '<span class="btnTemp" style="font-size:2em !important;text-align : center !important;font-weight:bold">완료</span>',
										cls:'btn btn-primary btnTemp'+_global.options.work_book_tema+'button',
										handler: function(){me.exec(rec,'comp')}
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

	exec : function (rec, check){
		var pjod_idcd = rec.data.pjod_idcd,
			prod_qntt = rec.data.prod_qntt,
			store =  Ext.ComponentQuery.query('module-symct-workentry-lister')[0].getStore(),
			param =  Ext.ComponentQuery.query('module-symct-workentry-search')[0].getValues(),
			wkct_idcd = param.wkct_name,
			invc_date = param.work_date,
			item_idcd = rec.data.item_idcd,
			line_seqn = rec.data.line_seqn,
			seq,_set,
			prod_qntt = rec.data.prod_qntt,
			acpt_qntt = rec.data.acpt_qntt,
			prog_stat_dvcd = '1'
		;
		if(!wkct_idcd){
			Ext.Msg.alert("알림", "공정을 선택하여 주시기 바랍니다.");
			return;
		}

		if(check == 'up'){
			if(acpt_qntt > prod_qntt){
				rec.set('prod_qntt', prod_qntt+1);
			}else{
				prod_qntt = prod_qntt;
			}
		}else if(check == 'down'){
			if(0 == prod_qntt){
				prod_qntt = 0;
			}else{
				rec.set('prod_qntt', prod_qntt-1);
			}
		}else if(check == 'comp'){
			rec.set('prod_qntt', acpt_qntt );
			prog_stat_dvcd = '3';
		}
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/symct/prod/set/complete.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					pjod_idcd	: pjod_idcd,
					wkct_idcd	: wkct_idcd,
					invc_date	: invc_date,
					line_seqn	: line_seqn,
					prod_qntt	: rec.get('prod_qntt'),
					item_idcd	: item_idcd,
					prog_stat_dvcd : prog_stat_dvcd
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
					store.reload();
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
	},

	insert : function (rec) {
		var search = Ext.ComponentQuery.query('module-symct-workentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			store = Ext.ComponentQuery.query('module-symct-workentry-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-symct-workentry-detail')[0].getStore()
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
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						trigger1Cls : _global.options.work_book_tema+'dateTrigger',
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date()
					},{	fieldLabel	: Language.get('work_sttm','시작시간'),
						name		: 'work_sttm',
						xtype		: 'timefield',
						format		: 'H:i',
						submitFormat: 'Hi',
						hideTrigger	: true,
						value		: new Date(),
						minValue: '00:00 AM',
						maxValue: '23:59 PM',
						width		: 533,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						listConfig:{
							itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
					},{	fieldLabel	: Language.get('wker_idcd_1fst','작업자'),
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_1fst',
						pair		: 'wker_idcd_1fst',
						trigger1Cls : _global.options.work_book_tema+'searchTrigger',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-symct-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_1fst', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('wker_name_2snd',' '),
						value		: '',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_2snd',
						trigger1Cls : _global.options.work_book_tema+'searchTrigger',
						pair		: 'wker_idcd_2snd',
						margin		: '0 0 20 0',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-symct-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_2snd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('wker_name_3trd',' '),
						value		: '',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.options.work_book_tema+'searchTrigger',
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wker_name_3trd',
						pair		: 'wker_idcd_3trd',
						clearable	: false ,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-symct-wkctmans-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd},
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('empy_name'));
								pairField.setValue(records[0].get('empy_idcd'));
							}
						}
					},{	name : 'wker_idcd_3trd', xtype : 'textfield' , hidden : true
					},{	fieldLabel	: Language.get('cvic_name','설비'),
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cvic_name',
						pair		: 'cvic_idcd',
						value		: '',
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
						cls			: 'textTemp',
						width		: 550,
						height		: 50,
						labelStyle	: 'line-height: 75px;',
						trigger1Cls : _global.options.work_book_tema+'searchTrigger',
						popup: {
							select : 'SINGLE',
							widget : 'lookup-symct-wkctcvic-popup',
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
								url		: _global.location.http() + '/custom/symct/prod/get/getSeqn.do',
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
										if(result.records[0].seq){
											seq = result.records[0].seq+1;
										}else{
											seq = 1;
										}
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
								item_idcd		: rec.get('work_item_idcd'),
								line_seqn		: rec.get('line_seqn'),
								wkct_idcd		: rec.get('wkct_idcd'),
								idcd			: rec.get('idcd'),
								prnt_idcd		: rec.get('prnt_idcd'),
								work_ordr_dvcd	: rec.get('work_ordr_dvcd'),
								ordr_degr		: rec.get('ordr_degr'),
								name			: rec.get('item_name'),
								invc_date		: param.work_date,
								wker_idcd		: param.wker_idcd_1fst,
								wker_idcd_1fst	: param.wker_idcd_1fst,
								wker_idcd_2snd	: param.wker_idcd_2snd,
								wker_idcd_3trd	: param.wker_idcd_3trd,
								work_sttm		: param.work_sttm+'00',
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

});