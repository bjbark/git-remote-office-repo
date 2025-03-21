Ext.define('module.prod.order.workbookv5.view.WorkBookV5FailLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workbookv5-fail'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workbookv5.store.WorkBookV5FailLister',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary'} ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
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
					'->',
					{text : '<span class="btnTemp" style="font-size:1.8em;">수정</span>', iconCls: Const.MODIFY.icon, handler : me.modify, cls: 'button-style', width: 90, height : 35, margin: '0 5 0 0' }
					,'-' ,
					{text : '<span class="btnTemp" style="font-size:1.8em;">삭제</span>', iconCls: Const.DELETE.icon, action : Const.DELETE.action, cls: 'button1-style', width: 90, height : 35, margin: '0 5 0 0' }
				]
			};
		return item ;
	},

	listeners:{
		afterrender:function(){
			var store = Ext.ComponentQuery.query('module-workbookv5-fail')[0].getStore(),
				detail = Ext.ComponentQuery.query('module-workbookv5-detail')[0],
				select = detail.getSelectionModel().getSelection()[0],
				param = Ext.merge( { invc_numb : select.get('invc_numb')
				})
			;
			store.load({
				params : { param:JSON.stringify(
						param
				) },
				scope:this,
				callback:function(records, operation, success) {
				}
			});
		},
	},

	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'loss_resn_dvcd'	, text : Language.get('loss_resn_dvcd'	,'유실코드'		) , width : 70  , align : 'center'
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'			) , flex  : 100 , align :'left'
					},{ dataIndex: 'loss_name'		, text : Language.get('loss_name'		,'유실명칭'		) , flex  : 100 , align :'left'
					},{ dataIndex: 'sttm'			, text : Language.get('sttm'			,'시작시간'		) , width : 90 , align : 'center'
					},{ dataIndex: 'edtm'			, text : Language.get('edtm'			,'종료시간'		) , width : 90 , align : 'center'
					},{ dataIndex: 'loss_time'		, text : Language.get('loss_time'		,'유실시간(분)'	) , width : 120 , xtype:'numericcolumn', summaryType: 'sum',
						summaryRenderer: function(value, summaryData, field) {
							var window	= me.up('window');
								form	= window.down('form')
							;
								var val = Ext.util.Format.number(Number(value), '0,000');
								var x = '<span class="btnTemp" style="color:black;font-size:1.5em;">'+val+'</span>'
							return x;
						}
					}
				]
			}
		;
		return item;
	},
	//TODO 유실보고 수정
	modify:function(){
		var	me = this,
			grid	= this.up('grid'),
			select	= grid.getSelectionModel().getSelection()[0]
		;
		if(select){
			var search     = Ext.ComponentQuery.query('module-workbookv5-search')[0],
				store      = Ext.ComponentQuery.query('module-workbookv5-lister')[0].getStore(),
				store2     = Ext.ComponentQuery.query('module-workbookv5-detail')[0].getStore(),
				me         = this
			;
			var form = Ext.widget('form', {
				border         : false,
				itemId         : 'fail',
				bodyPadding    : 10,
				fieldDefaults  : {
					labelWidth : 150,
					labelStyle : 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	fieldLabel	: Language.get('loss_resn_name', ' '),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
						xtype		: 'textfield',
						name		: 'loss_resn_name',
						width		: 413,
						height		: 50,
						maxWidth	: 500,
						readOnly	: true,
						value		: select.get('loss_name'),
						labelWidth	: 210,
						margin		: '20 0 0 0'
					},{ xtype:'textfield', name : 'loss_resn_dvcd',hidden:true, value	: select.get('loss_resn_dvcd'),
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('sttm','시간'),
								name		: 'sttm',
								xtype		: 'timefield',
								format		: 'H:i',
								labelWidth	: 60,
								submitFormat: 'Hi',
								value		: select.get('sttm'),
								minValue	: '00:00 AM',
								maxValue	: '23:59 PM',
								margin		: '0 0 0 70',
								readOnly	: false,
								width		: 180,
								height		: 50,
								labelStyle	: 'line-height: 45px;',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
								trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								cls			: 'textTemp'
							},{	fieldLabel	: Language.get('','~'),
								name		: 'edtm',
								xtype		: 'timefield',
								format		: 'H:i',
								submitFormat: 'Hi',
								margin		: '0 0 0 10',
								labelWidth	: 15,
								value		: select.get('edtm'),
								minValue	: '00:00 AM',
								maxValue	: '23:59 PM',
								readOnly	: false,
								margin		: '0 0 0 50',
								width		: 135,
								height		: 50,
								labelStyle	: 'line-height: 45px;',
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
								trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
								listConfig:{
									itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
								},
								cls			: 'textTemp'
							}
						]
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">계획정지</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('01');
								loss_resn_name.setValue('계획정지');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 0 30'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">일시정지</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('02');
								loss_resn_name.setValue('일시정지');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 0 20'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:1.7em;color:white;">원재료(컬러)교환</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('03');
								loss_resn_name.setValue('원재료(컬러)교환');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 0 20'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">승인대기</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('04');
								loss_resn_name.setValue('승인대기');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 0 30'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">금형교환</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('05');
								loss_resn_name.setValue('금형교환');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 0 20'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">금형이상</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('06');
								loss_resn_name.setValue('금형이상');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 0 20'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">사출기고장</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('07');
								loss_resn_name.setValue('사출기고장');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 0 30'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">로보트고장</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('08');
								loss_resn_name.setValue('로보트고장');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 0 20'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.0em;color:white;">기타설비고장</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('09');
								loss_resn_name.setValue('기타설비고장');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 0 20'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">시사출</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('10');
								loss_resn_name.setValue('시사출');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 30 30'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.5em;color:white;">샘플</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('11');
								loss_resn_name.setValue('샘플');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 30 20'
					},{	xtype	: 'button',
						text    : '<span class="btnTemp" style="font-size:2.0em;color:white;">기타(인원등등)</span>',
						listeners :{
							click : function(){
								var form			= this.up('form'),
									loss_resn_name	= form.down('[name=loss_resn_name]'),
									loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
								;
								loss_resn_dvcd.setValue('12');
								loss_resn_name.setValue('기타(인원등등)');
							}
						},
						cls     : 'failbutton-style',
						width   : 150,
						height  : 50,
						margin  :'30 0 30 20'
					}
				],
				buttons: [
					{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls		: 'button-style',
						flex	: 1,
						height	:50,
						handler	: function() {
							var form			= this.up('form'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]'),
								loss_resn_name	= form.down('[name=loss_resn_name]')
							;
							if(loss_resn_dvcd){
								me.up('grid').failupdate(form.getValues());
							}else{
								return;
							}
							win.destroy();
						}
					},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls		: 'button-style',
						flex	: 1,
						height	:50,
						handler	: function() {
//							this.up('form').getForm().reset();
//							Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
							win.destroy();
						}
					}
				]
			});

			win = Ext.widget('window', {
				title		: '<span class="btnTemp" style="font-size:16px; color:black;">유실보고</span>',
				closeAction	: 'destory',
				width		: 586,
				height		: 590,
				layout		: 'fit',
				resizable	: true,
				modal		: true,
				items		: form,
				defaultFocus: ''
			});
			win.show();
		}else{

		}
	},

	//TODO 유실보고 업로드
	failupdate : function (param) {
		var me = this,
			sttm1     = param.sttm,
			edtm1     = param.edtm,
			loss_resn_dvcd     = param.loss_resn_dvcd,
			sttm      = sttm1.replace(':',''),
			edtm      = edtm1.replace(':',''),
			detail    = Ext.ComponentQuery.query('module-workbookv5-detail')[0],
			fail      = Ext.ComponentQuery.query('module-workbookv5-fail')[0],
			select    = detail.getSelectionModel().getSelection()[0],
			value     = fail.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			loss_time = 0,
			sttm_hour = sttm.substring(0,2),
			sttm_min  = sttm.substring(2,4),
			edtm_hour  = edtm.substring(0,2),
			edtm_min  = edtm.substring(2,4),
			time = edtm_hour-sttm_hour,
			min  = edtm_min-sttm_min
		;
		if(loss_resn_dvcd==null||loss_resn_dvcd==''){
			Ext.Msg.alert("알림","유실유형을 선택하여주십시오.");
			return;
		}
		if(sttm1==null||sttm1==''||edtm1==null||edtm1==''||edtm1 < sttm1){
			Ext.Msg.alert("알림","시간을 다시 입력하여주십시오.");
			return;
		}else{
			if(min < 0){
				time = edtm_hour-sttm_hour-1;
				min  = edtm_min-sttm_min + 60;
			}
			var total = (time*60)+min;
			//line_seqn count

			Ext.Ajax.request({
				url		: _global.location.http() + '/prod/order/workbookv5/set/fail.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'update',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: value.get('line_seqn'),
						invc_date		: select.get('invc_date'),
						cvic_idcd		: select.get('cvic_idcd'),
						loss_resn_dvcd	: loss_resn_dvcd,
						sttm			: sttm+'00',
						edtm			: edtm+'00',
						loss_time		: total,
						loss_pcnt		: 0,
						loss_mnhr		: 0,
						work_dsct_yorn	: 0,
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
					fail.getStore().reload();
				}
			});
		}
	},
});