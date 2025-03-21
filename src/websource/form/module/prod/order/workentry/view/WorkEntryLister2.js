Ext.define('module.prod.order.workentry.view.WorkEntryLister2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-workentry-lister2'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.prod.order.workentry.store.WorkEntryLister2',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					'->', '-' ,
					{	text : Const.INSERT.text, iconCls: Const.INSERT.icon, handler: me.insert ,cls: 'button-style',itemId:'insert' } ,
					{	text : Const.MODIFY.text, iconCls: Const.MODIFY.icon, handler: me.insert ,cls: 'button-style',itemId:'modify' } ,
					{	text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style', itemId:'lister2'} , '-' ,
					{	text : Const.DELETE.text, iconCls: Const.DELETE.icon, handler: me.deleteItem ,cls: 'button-style' }
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번')			, width : 60 , align : 'center' ,hidden : true
					},{ dataIndex: 'rank'			, text : Language.get('rank'			,'순번')			, width : 60 , align : 'center'
					},{ dataIndex: 'wkct_code'		, text : Language.get('wkct_code'		,'공정코드')		, width : 120 , align : 'center'
					},{ dataIndex: 'wkct_name'		, text : Language.get('wkct_name'		,'공정명')			, width : 200
					},{ dataIndex: 'insp_mthd_dvcd'	, text : Language.get('insp_mthd_dvcd'	,'검사방법')		, width : 120 , xtype : 'lookupcolumn', lookupValue : resource.lookup('insp_mthd_dvcd'), align : 'center'
					},{ dataIndex: 'insp_qntt'		, text : Language.get('insp_qntt'		,'검사수량')		, width : 80 , xtype:'numericcolumn'
					},{ dataIndex: 'pass_qntt'		, text : Language.get('pass_qntt'		,'합격수량')		, width : 80 , xtype:'numericcolumn'
					},{ dataIndex: 'poor_qntt'		, text : Language.get('poor_qntt'		,'불량수량')		, width : 80, xtype:'numericcolumn'
					},{ dataIndex: 'judt_dvcd'		, text : Language.get('judt_dvcd'		,'판정')			, width : 120 ,hidden:true
					},{ dataIndex: 'insp_strt_time'	, text : Language.get('insp_strt_time'	,'검사시작시간')		, width : 120 ,hidden:true
					},{ dataIndex: 'insp_endd_time'	, text : Language.get('insp_endd_time'	,'검사종료시간')		, width : 120 ,hidden:true
					},{ dataIndex: 'cvic_name'		, text : Language.get('cvic_name'		,'설비명')			, width : 120 ,hidden:true
					},{ dataIndex: 'insp_cvic_idcd'	, text : Language.get('insp_cvic_idcd'	,'설비id')		, width : 120 ,hidden:true
					}
				]
			}
		;
		return item;
	},
	insert : function () {
		var	store = this.up('grid').getStore(),
			milestone = this.itemId,
			tempa = this.up('grid'),
			selectItem,
			sItemLength,
			line_seqn,
			invc_numb,
			_set
		;
		if(store.queryparam == null || store.queryparam == ""){
			Ext.Msg.alert("알림", '생산실적을 선택해주세요' );
			return;
		}else{
			invc_numb 	= store.queryparam.invc_numb;
			if(milestone == 'modify'){
				if(tempa.getSelectionModel().selected.items.length > 0){
					selectItem = tempa.getSelectionModel().selected.items[0].data;
					line_seqn = selectItem.line_seqn;
					_set	  = 'update';
				}else{
					Ext.Msg.alert("알림", '수정하려는 공정을 선택해주세요' );
					return;
				}
			}else{
				_set		= 'insert';
				if(tempa.getStore().data.length >0){
					sItemLength = tempa.getStore().data.length-1;
					line_seqn 	= tempa.getStore().data.items[sItemLength].data.line_seqn+1;
				}else{
					line_seqn 	= 0;
				}
				selectItem	= '{ wkct_idcd : "",wkct_name:"",cnfm_drtr_idcd:"",user_name="",'
					+'insp_qntt="",good_qntt="",poor_qntt="",judt_dvcd="",smli_dvcd="",insp_date=""}';
			}
			var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				fieldDefaults: {
					labelWidth: 80,
					labelStyle: 'text-align:right',
					width		: 280,
					labelSeparator : ''
				},
				items:[
					{	fieldLabel	: Language.get('wkct_idcd','검사공정'),			//temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'wkct_name',
						pair		: 'wkct_idcd',
						width		: 395,
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						clearable	: false ,
						value		: selectItem.wkct_name,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-wkct-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('wkct_name'));
								pairField.setValue(records[0].get('wkct_idcd'));
							}
						}
					},{	name : 'wkct_idcd', xtype : 'textfield' , hidden : true, value: selectItem.wkct_idcd
					},{	fieldLabel	: Language.get('cnfm_drtr_idcd','담당자'),			//temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'user_name',
						pair		: 'cnfm_drtr_idcd',
						clearable	: false ,
						width		: 395,
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						value		: selectItem.user_name,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-user-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('user_name'));
								pairField.setValue(records[0].get('user_idcd'));
							}
						}
					},{	name : 'cnfm_drtr_idcd', xtype : 'textfield' , hidden : true,value : selectItem.cnfm_drtr_idcd
					},{	fieldLabel	: Language.get('cvic_name','사용설비'),			//temp
						xtype		: 'popupfield',
						editable	: true,
						enableKeyEvents : true,
						name		: 'cvic_name',
						pair		: 'insp_cvic_idcd',
						clearable	: false ,
						width		: 395,
						allowBlank	: false,
						fieldCls	: 'requiredindex',
						emptyText	: Const.invalid.emptyValue,
						value		: selectItem.cvic_name,
						popup: {
							select : 'SINGLE',
							widget : 'lookup-cvic-popup',
							params : { stor_grp : _global.stor_grp , row_sts : '0', cvic_kind_dvcd:'4000' },
							result : function(records, nameField, pairField) {
								nameField.setValue(records[0].get('cvic_name'));
								pairField.setValue(records[0].get('cvic_idcd'));
							}
						}
					},{	name : 'insp_cvic_idcd', xtype : 'textfield' , hidden : true,value : selectItem.insp_cvic_idcd
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('insp_date','검사시간'),
								xtype		: 'datefield',
								name		: 'insp_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								value		: selectItem.insp_date,
								width		: 180,
							},{	fieldLabel	: Language.get('insp_strt_time','생산시간'),
								labelWidth	: 60,
								xtype		: 'timefield',
								name		: 'insp_strt_time',
								margin		: '0 0 0 0',
								format: 'H:i',
								increment: 30,
								anchor: '100%',
								width		: 130,
								value		: selectItem.insp_strt_time,
							},{ labelWidth	: 10,
								fieldLabel	: Language.get('','~'),
								xtype		: 'timefield',
								name		: 'insp_endd_time',
								margin		: '0 0 0 5',
								format: 'H:i',
								increment: 30,
								anchor: '100%',
								width		: 80,
								value		: selectItem.insp_endd_time,
							}
						]
					},{	fieldLabel	: Language.get('smli_dvcd','검사구분'),
						xtype		: 'lookupfield',
						name		: 'smli_dvcd',
						lookupValue	: resource.lookup('smli_dvcd'),
						value		: selectItem.smli_dvcd,
						width		: 395,
					},{	fieldLabel	: Language.get('insp_mthd_dvcd','검사방법'),
						xtype		: 'lookupfield',
						name		: 'insp_mthd_dvcd',
						lookupValue	: resource.lookup('insp_mthd_dvcd'),
						value		: selectItem.insp_mthd_dvcd,
						width		: 395,
					},{	fieldLabel	: Language.get('insp_qntt','검사수량'),
						name		: 'insp_qntt',
						xtype		: 'numericfield',
						value		: selectItem.insp_qntt,
						width		: 395,
						listeners	: {
							change : function(){
								var panel = this.up('form'),
									good_qntt = panel.down('[name=good_qntt]').getValue(),
									poor_qntt = panel.down('[name=poor_qntt]').getValue()
								;
								if(this.getValue()=='' || this.getValue()==null){
									panel.down('[name=good_temp]').setValue('0%');
									panel.down('[name=poor_temp]').setValue('0%');
								}else{
									if(good_qntt != null){
										var avgg = (good_qntt/this.getValue())*100;
										avgg = Ext.util.Format.number(avgg,'0,000.00');
										panel.down('[name=good_temp]').setValue(avgg+'%');
									}
									if(poor_qntt != null){
										var avgp = (poor_qntt/this.getValue())*100;
										avgp = Ext.util.Format.number(avgp,'0,000.00');
										panel.down('[name=poor_temp]').setValue(avgp+'%');
									}
								}
							}
						}
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('good_qntt','양품수량'),
								name		: 'good_qntt',
								xtype		: 'numericfield',
								labelStyle	: 'color:blue;text-align:right',
								width		: 345,
								value		: selectItem.good_qntt,
								listeners	: {
									beforerender: function() {
										 var panel = this.up('form');
											var insp_qntt = panel.down('[name=insp_qntt]').getValue()
											if(insp_qntt != null){
												var avgp = (this.getValue()/insp_qntt)*100;
												if(isNaN(avgp)){
												}else{
													avgp = Ext.util.Format.number(avgp,'0,000.00');
													panel.down('[name=good_temp]').setValue(avgp+'%');
												}
											}
									},
									change : function(){
										 var panel = this.up('form');
											var insp_qntt = panel.down('[name=insp_qntt]').getValue()
											if(insp_qntt != null){
												var avgp = (this.getValue()/insp_qntt)*100;
												avgp = Ext.util.Format.number(avgp,'0,000.00');
												panel.down('[name=good_temp]').setValue(avgp+'%');
											}
									}
								}
							},{	xtype		: 'field',
								readOnly	: 'readonly',
								name		: 'good_temp',
								fieldCls	: 'readonlyfield',
								width		: 50,
								fieldStyle	: 'border:0;color:blue;text-align:center;font-weight:bold',
								value		: '0%',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('poor_qntt','불량수량'),
								name		: 'poor_qntt',
								labelStyle	: 'color:red; text-align:right',
								xtype		: 'numericfield',
								value		: selectItem.poor_qntt,
								width		: 345,
								listeners	: {
									beforerender: function() {
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue()
										if(insp_qntt != null){
											var avgp = (this.getValue()/insp_qntt)*100;
											if(isNaN(avgp)){
											}else{
												avgp = Ext.util.Format.number(avgp,'0,000.00');
												panel.down('[name=poor_temp]').setValue(avgp+'%');
											}
										}
									},
									change : function(){
										var panel = this.up('form');
										var insp_qntt = panel.down('[name=insp_qntt]').getValue()
										if(insp_qntt != null){
											var avgp = (this.getValue()/insp_qntt)*100;
											avgp = Ext.util.Format.number(avgp,'0,000.00');
											panel.down('[name=poor_temp]').setValue(avgp+'%');
											console.log(this.getValue());
											if(this.getValue()>0){
												panel.down('[name=judt_dvcd]').setValue('2');
											}else if(this.getValue()==0||this.getValue()==''){
												panel.down('[name=judt_dvcd]').setValue('1');
											}
										}
									}
								}
							},
							{	xtype		: 'field',
								readOnly	: 'readonly',
								name		: 'poor_temp',
								fieldCls	: 'readonlyfield',
								width		: 50,
								fieldStyle	: 'border:0;color:red;text-align:center;font-weight:bold',
								value		: '0%',
							}
						]
					},{	fieldLabel	: Language.get('judt_dvcd','판정'),
						xtype		: 'lookupfield',
						name		: 'judt_dvcd',
						lookupValue	: resource.lookup('judt_dvcd'),
						value		: selectItem.judt_dvcd,
						width		: 395,
					},
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:1em">저장</span>',
						cls: 'button-style',
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							if(param.wkct_idcd == null || param.wkct_idcd == "" || param.cnfm_drtr_idcd =="" || param.cnfm_drtr_idcd==null
									|| param.insp_cvic_idcd == "" || param.insp_cvic_idcd == null){
								return;
							}else{
								record = Ext.create( store.model.modelName , {
									cnfm_drtr_idcd	: param.cnfm_drtr_idcd,
									insp_mthd_dvcd	: param.insp_mthd_dvcd,
									judt_dvcd		: param.judt_dvcd,
									user_name		: param.user_name,
									wkct_idcd		: param.wkct_idcd,
									wkct_name		: param.wkct_name,
									good_qntt		: param.good_qntt,
									poor_qntt		: param.poor_qntt,
									invc_numb		: invc_numb,
									line_seqn		: line_seqn,
									insp_qntt		: param.insp_qntt,
									insp_date		: param.insp_date,
									smli_dvcd		: param.smli_dvcd,
									insp_cvic_idcd	: param.insp_cvic_idcd,
									insp_strt_time	: param.insp_strt_time,
									insp_endd_time	: param.insp_endd_time
								});
								store.add(record);
								store.sync({
									callback: function(batch, options) {
										store.reload();
										this.up('form').getForm().reset();
										this.up('window').hide();
									} ,
									scope: this
								},{	synchro : _global.objects.synchro,_set : _set} );
							}
						}
					},{	text: '<span class="btnTemp" style="font-size:1em">취소</span>',
						cls: 'button-style',
						handler: function() {
							this.up('form').getForm().reset();
							this.up('window').hide();
						}
					}
				]
			});

			win = Ext.widget('window', {
				title: '검사입력',
				closeAction: 'hide',
				width: 450,
				height: 370,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: 'insp_qntt'
			});
			win.show();
		}
	},
	deleteItem : function() {
		var	tempa = this.up('grid'),
			store = this.up('grid').getStore(),
			selectItem = tempa.getSelectionModel().selected.items[0].data,
			line_seqn = selectItem.line_seqn,
			invc_numb = selectItem.invc_numb,
			_set = 'delete'
		;
		Ext.Msg.confirm("알림","삭제하시겠습니까?",function(button){
			if(button=='yes'){
				record = Ext.create( store.model.modelName , {
					invc_numb: invc_numb,
					line_seqn: line_seqn,
				});
				store.add(record);
				store.sync({
					callback: function(batch, options) {
						store.reload();
					} ,
					scope: this
				},{	synchro : _global.objects.synchro,_set : _set} );
			}
		});
	}
});