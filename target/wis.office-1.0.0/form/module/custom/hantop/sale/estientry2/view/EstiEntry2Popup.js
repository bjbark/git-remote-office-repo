Ext.define('module.custom.hantop.sale.estientry2.view.EstiEntry2Popup', { extend: 'Axt.popup.Search',
	alias	: 'widget.module-estientry2-popup',
	requires: [

	],
	title	: '견적관리 소요자재산출',
	closable: true,
	autoShow: true,
	width	: 1310,
	height	: 800,
	layout	: {
		type: 'border'
	},
	defaultFocus : 'initfocused',

	initComponent: function(config){
		var me = this;
		me.items = [me.createGrid(), me.createForm(), me.createGrid2()];
		me.callParent(arguments);

		if(me.popup.params){
			me.down('form').loadRecord(me.popup.params.record);
		}
	},

	listeners:{
		render:function(){
			var	grid = this.down('grid'),
				store = grid.getStore(),
				param = Ext.merge( this.down('form').getValues(), { hq_id : _global.hq_id
				}, this.popup.params ),
				master	= Ext.ComponentQuery.query('module-estientry2-lister-master')[0],
				record	= master.getSelectionModel().getSelection(),
				mtrl	= Ext.ComponentQuery.query('module-estientry2-mtrl-lister')[0],
				store2	= mtrl.getStore(),
				lister	= Ext.ComponentQuery.query('module-estientry2-worker-lister')[0],
				listerRecord = lister.getSelectionModel().getSelection()[0],
				store3	= lister.getStore()
			;

			if(record.length > 0){
				store.removeAll();
				for (var i = 0; i < store3.data.items.length; i++) {
					var a = store3.data.items[i];
					store.add(a);
				}
//				var desired_record = store.findRecord('line_seqn', record[0].get('line_seqn'));
//				console.log(store);
				var i = 0;

//				this.down('grid').getSelectionModel().select(desired_record);
				var line_seqn =0;
				if(!listerRecord==undefined){
					line_seqn = listerRecord.get('line_seqn');
					store.each(function(records){
						if(records.get('line_seqn')== listerRecord.get('line_seqn')){
							grid.getSelectionModel().select(i);
						}
						i++;
					})
				}
				store2.load({
					params	: {
						param:JSON.stringify({
							invc_numb : record[0].get('invc_numb'),
							line_seqn : line_seqn,
							brnd_bacd : '01',
							all       : mtrl.down('[name=bfsf_dvcd]').getValue(),
							bf        : mtrl.down('[name=bfsf_dvcd1]').getValue(),
							sf        : mtrl.down('[name=bfsf_dvcd2]').getValue(),
							mf        : mtrl.down('[name=bfsf_dvcd3]').getValue(),
						})}, scope:this,
					callback:function(records, operation, success) {
					}
				});

			}
		}
	},

	createGrid : function() {
		var me = this,
			grid = {
			xtype		: 'grid-panel',
			region		: 'west',
			itemId		: 'lister2',
			flex		: 2.3,
			viewConfig	: {
				loadMask: false
			},
			store	: 'module.custom.hantop.sale.estientry2.store.EstiEntry2WorkerLister',
			selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
			features	: [{ ftype : 'grid-summary'}],
			plugins		: {ptype  :'cellediting-directinput', clicksToEdit: 1 },
			columns: [
				{	dataIndex:	'line_seqn'			, width :  40, align : 'center'	, text: Language.get('line_seqn'			, '순번'		)
				},{	dataIndex:	'ispl_name'			, width : 100, align : 'center'	, text: Language.get('ispl_name'			, '설치위치'	)
				},{	dataIndex:	'base_name'			, width :  80, align : 'center'	, text: Language.get('base_name'			, '브랜드명'	)
				},{	dataIndex:	'brnd_bacd'			, width :  80, align : 'center'	, text: Language.get('brnd_bacd'			, '브랜드코드'	), hidden : true
				},{	dataIndex:	'wdgr_idcd'			, width : 110, align : 'center'	, text: Language.get('wdgr_idcd'			, '그룹ID'	), hidden : true
				},{	dataIndex:	'wdgr_name'			, width : 110, align : 'center'	, text: Language.get('wdgr_name'			, '그룹명'		)
				},{	dataIndex:	'modl_name'			, width : 110, align : 'center'	, text: Language.get('modl_name'			, '모델명'		)
				},{	dataIndex:	'wdsf_rate_name'	, width : 120, align : 'left'	, text: Language.get('wdsf_rate_name'		, '창형태'		)	//창짝비율명
				},{	dataIndex:	'wdbf_itid'			, width : 120, align : 'left'	, text: Language.get('wdbf_itid'			, 'BF자재'	)
				},{	dataIndex:	'wdsf_itid'			, width : 120, align : 'left'	, text: Language.get('wdsf_itid'			, 'SF자재'	)
				},{	dataIndex:	'item_widh'			, width :  70, align : 'right'	, text: Language.get('item_widh'			, '길이(W)'	)
				},{	dataIndex:	'item_hght'			, width :  70, align : 'right'	, text: Language.get('item_hght'			, '높이(H)'	)
				},{	dataIndex:	'item_widh_1fst'	, width :  70, align : 'right'	, text: Language.get('item_widh_1fst'		, '길이1(W)'	)
				},{	dataIndex:	'item_hght_1fst'	, width :  70, align : 'right'	, text: Language.get('item_hght_1fst'		, '높이1(H)'	)
				},{	dataIndex:	'rpst_wryp_name'	, width :  80, align : 'center'	, text: Language.get('rpst_wryp_name'		, '대표색상'	)
				},{	dataIndex:	'inwp_itid'			, width : 110, align : 'center'	, text: Language.get('inwp_itid'			, '내부랩핑'	)
				},{	dataIndex:	'otwp_itid'			, width : 110, align : 'center'	, text: Language.get('otwp_itid'			, '외부랩핑'	)
				},{	dataIndex:	'ings_tick'			, width :  80, align : 'center'	, text: Language.get('ings_tick'			, '내부유리두께'	)
				},{	dataIndex:	'otgs_tick'			, width :  80, align : 'center'	, text: Language.get('otgs_tick'			, '외부유리두께'	)
				},{	dataIndex:	'ings_itid'			, width : 100, align : 'left'	, text: Language.get('ings_itid'			, '내부유리종류'	), hidden : true
				},{	dataIndex:	'otgs_itid'			, width : 100, align : 'left'	, text: Language.get('otgs_itid'			, '외부유리종류'	), hidden : true
				},{	dataIndex:	'ings_fixd_itid'	, width : 100, align : 'left'	, text: Language.get('ings_fixd_itid'		, '내부FIX유리종류'	), hidden : true
				},{	dataIndex:	'otgs_fixd_itid'	, width : 100, align : 'left'	, text: Language.get('otgs_fixd_itid'		, '외부FIX유리종류'	), hidden : true
				},{	dataIndex:	'invc_qntt'			, width :  60, align : 'right'	, text: Language.get('invc_qntt'			, '수량'		)
				},{	dataIndex:	'invc_pric'			, width :  60, align : 'right'	, text: Language.get('invc_pric'			, '단가'		)
				},{	dataIndex:	'invc_amnt'			, width :  60, align : 'right'	, text: Language.get('invc_amnt'			, '금액'		)
				},{	dataIndex:	'inhd_left_itid'	, width : 120, align : 'left'	, text: Language.get('inhd_left_itid'		, '핸들내부(좌)'), hidden : true
				},{	dataIndex:	'inhd_righ_itid'	, width : 120, align : 'left'	, text: Language.get('inhd_righ_itid'		, '핸들내부(우)'), hidden : true
				},{	dataIndex:	'othd_left_itid'	, width : 120, align : 'left'	, text: Language.get('othd_left_itid'		, '핸들외부(좌)'), hidden : true
				},{	dataIndex:	'othd_righ_itid'	, width : 120, align : 'left'	, text: Language.get('othd_righ_itid'		, '핸들외부(우)'), hidden : true
				},{	dataIndex:	'clee_innr'			, width :  90, align : 'left'	, text: Language.get('clee_innr'			, '크리센트(내부)'), hidden : true
				},{	dataIndex:	'clee_otsd'			, width :  90, align : 'left'	, text: Language.get('clee_otsd'			, '크리센트(외부)'), hidden : true
				},{	dataIndex:	'vent_plac_dvcd'	, width :  60, align : 'center'	, text: Language.get('vent_plac_dvcd'		, 'VENT'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('vent_plac_dvcd')
				},{	dataIndex:	'hndl_hght'			, width :  65, align : 'right'	, text: Language.get('hndl_hght'			, '핸들높이'	)
				},{	dataIndex:	'wdbf_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('wdbf_incl_yorn'		, '틀'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
				},{	dataIndex:	'wdsf_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('wdsf_incl_yorn'		, '짝'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
				},{	dataIndex:	'moss_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('moss_incl_yorn'		, '망'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
				},{	dataIndex:	'moss_itid'			, width : 100, align : 'center'	, text: Language.get('moss_itid'			, '방충망'		)
				},{	dataIndex:	'bfrn_incl_yorn'	, width :  60, align : 'center'	, text: Language.get('bfrn_incl_yorn'		, 'BF보강재'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
				},{	dataIndex:	'mult_hole_yorn'	, width :  60, align : 'center'	, text: Language.get('mult_hole_yorn'		, '배수홀'		), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
				},{	dataIndex:	'efcn_grad_dvcd'	, width : 100, align : 'center'	, text: Language.get('efcn_grad_dvcd'		, '효율등급'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('efcn_grad_dvcd')
				},{	dataIndex:	'wdbf_auto_cutt_yorn', width :  80, align : 'center', text: Language.get('wdbf_auto_cutt_yorn'	, 'BF자동절단'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
				},{	dataIndex:	'wdbf_auto_weld_yorn', width :  80, align : 'center', text: Language.get('wdbf_auto_weld_yorn'	, 'BF자동용접'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
				},{	dataIndex:	'wdsf_auto_cutt_yorn', width :  80, align : 'center', text: Language.get('wdsf_auto_cutt_yorn'	, 'SF자동절단'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
				},{	dataIndex:	'wdsf_auto_weld_yorn', width :  80, align : 'center', text: Language.get('wdsf_auto_weld_yorn'	, 'SF자동용접'	), xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn')
				},{	dataIndex:	'remk_text'			, width : 200, align : 'left'	, text: Language.get('remk_text'			, '비고'		)
				}
			]
		};
	return grid;
	},

	createForm : function(){
		var me	= this,
			item = {
			xtype		: 'form-panel' ,
			region		: 'center',
			flex		: 6.8,
			bodyStyle	: { padding: '5px' },
			items		: [
				{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0,
					items	: [
						{	xtype	: 'fieldset', layout: 'vbox' , padding:'0', border: 0,
							flex	: 6.5,
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0,
									height	: 45,
									width	: '100%',
									style	: 'background-color : blue;',
									items	: [
										{	xtype		: 'label',
											margin		: '15 0 0 12',
											style		: 'font-size:11px!important; color:white;',
											text		: '원자재LOSS : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; color:white;',
											text		: '',
											width		: 25,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry2-worker-editor')[0].down('[name=bsmt_loss_rate]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: '%'
										},{	xtype		: 'label',
											margin		: '15 0 0 15',
											style		: 'font-size:11px!important; color:white;',
											text		: '부자재LOSS : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; color:white;',
											text		: '',
											width		: 25,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry2-worker-editor')[0].down('[name=asmt_loss_rate]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: '%'
										},{	xtype		: 'label',
											margin		: '15 0 0 15',
											style		: 'font-size:11px!important; color:white;',
											text		: '용접LOSS : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; color:white;',
											text		: '',
											width		: 25,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry2-worker-editor')[0].down('[name=weld_loss_rate]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: '%'
										},{	xtype		: 'label',
											margin		: '15 0 0 15',
											style		: 'font-size:11px!important; color:white;',
											text		: '보강비스 : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; font-size:11px!important; color:white;',
											text		: '',
											width		: 32,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry2-worker-editor')[0].down('[name=rein_viss_itvl]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: 'mm'
										},{	xtype		: 'label',
											margin		: '15 0 0 15',
											style		: 'font-size:11px!important; color:white;',
											text		: '앵커부착 : '
										},{	xtype		: 'label',
											margin		: '15 5 0 5',
											style		: 'text-align : right; font-size:11px!important; font-size:11px!important; color:white;',
											text		: '',
											width		: 32,
											listeners	: {
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry2-worker-editor')[0].down('[name=ancr_atch_itvl]').getValue();
													if(val != null){
														me.setText(val);
													}else{
														me.setText('0');
													}
												},
											}
										},{	xtype		: 'label',
											margin		: '15 0 0 -2',
											style		: 'font-size:11px!important; color:white;',
											text		: 'mm'
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '-3 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('brnd_bacd', '브랜드' ),
											name		: 'base_name',
											xtype		: 'popupfield',
											editable	: false,
											enableKeyEvents : true,
											clearable	: true,
											pair		: 'brnd_bacd',
											width		: 290,
											labelWidth	: 65,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-base-popup',
												params : { stor_grp : _global.stor_grp , line_stat : '0', prnt_idcd : '4000' },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('base_name'));
													pairField.setValue(records[0].get('base_code'));
												}
											},
											listeners : {
												change : function(){
													if(this.getValue() == ''){
														me.down('[name=brnd_bacd]').setValue('');
													}
												},

												keydown : function(self, e) {
//													if (e.keyCode == e.ENTER || e.keyCode == e.TAP) {
//														console.log('gg');
//													}
												}
											}
										},{ xtype	: 'textfield', name : 'brnd_bacd', hidden : true,
											listeners : {
//												render : function(){
//													var val = Ext.ComponentQuery.query('module-estientry2-worker-editor')[0].down('[name=brnd_bacd2]').getValue(),
//													me = this
//												;
//													me.setValue(val);
//												},
												change : function(){
													me.down('[name=modl_name]').popup.params = { stor_grp : _global.stor_grp, dvcd : 'esti', brnd_bacd : this.getValue() } ;
												}
											}
										},{	fieldLabel	: 'BF보강재',
											xtype		: 'radiogroup',
											width		: 170,
											items: [
												{	boxLabel: '제외', name: 'bfrn_incl_yorn', inputValue: '0', checked: true
												},{	boxLabel: '포함', name: 'bfrn_incl_yorn', inputValue: '1'
												}
											]
										},{	fieldLabel	: '수량',
											xtype		: 'radiogroup',
											width		: 140,
											labelWidth	: 30,
											items: [
												{	boxLabel: '전체', name: 'rein_qntt_dvcd', inputValue: '0', checked: true
												},{	boxLabel: '1줄', name: 'rein_qntt_dvcd', inputValue: '1'
												}
											]
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('wdgr_name','창호그룹'),
											xtype		: 'popupfield',
											editable	: false,
											enableKeyEvents : true,
											name		: 'wdgr_name',
											pair		: 'wdgr_idcd',
											clearable	: true,
											width		: 290,
											labelWidth	: 65,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-hntop-group-popup',
												params : { stor_grp : _global.stor_grp, dvcd : 'esti' },
												result : function(records, nameField, pairField) {
													var popup = Ext.ComponentQuery.query('module-estientry2-popup')[0];
													nameField.setValue(records[0].get('wdgr_name'));
													pairField.setValue(records[0].get('wdgr_idcd'));
												},
											}
										},{ xtype		: 'textfield', name : 'wdgr_idcd', hidden : true,
											listeners : {
												change : function(){
													bacd =me.down('[name=brnd_bacd]').getValue()
													me.down('[name=modl_name]').popup.params = { stor_grp : _global.stor_grp, dvcd : 'esti', brnd_bacd : bacd, wdgr_idcd : this.getValue() } ;
												}
											}
										},{	fieldLabel	: '보양카바',
											xtype		: 'radiogroup',
											width		: 170,
											items: [
												{	boxLabel: '제외', name: 'bycv_incl_yorn', inputValue: '0', checked: true
												},{	boxLabel: '포함', name: 'bycv_incl_yorn', inputValue: '1'
												}
											]
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('modl_name','창호모델'),
											xtype		: 'popupfield',
											editable	: false,
											enableKeyEvents : true,
											name		: 'modl_name',
											pair		: 'wndw_modl_idcd',
											clearable	: true,
											width		: 290,
											labelWidth	: 65,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-hntop-model-popup',
												params : { stor_grp : _global.stor_grp, dvcd : 'esti' },
												result : function(records, nameField, pairField) {
													var popup = Ext.ComponentQuery.query('module-estientry2-popup')[0];
													nameField.setValue(records[0].get('modl_name'));
													pairField.setValue(records[0].get('wndw_modl_idcd'));

													popup.down('[name=wdbf_itid]').setValue(records[0].get('wdbf_itid'));
													popup.down('[name=wdsf_itid]').setValue(records[0].get('wdsf_itid'));
													popup.down('[name=wdbf_auto_cutt_yorn]').setValue(records[0].get('wdbf_auto_cutt_yorn'));
													popup.down('[name=wdbf_auto_weld_yorn]').setValue(records[0].get('wdbf_auto_weld_yorn'));
													popup.down('[name=wdsf_auto_cutt_yorn]').setValue(records[0].get('wdsf_auto_cutt_yorn'));
													popup.down('[name=wdsf_auto_weld_yorn]').setValue(records[0].get('wdsf_auto_weld_yorn'));
												},
											},
										},{ xtype		: 'textfield', name : 'wdbf_itid', hidden : true
										},{ xtype		: 'textfield', name : 'wdsf_itid', hidden : true
										},{ xtype		: 'textfield', name : 'wndw_modl_idcd', hidden : true
										},{ xtype		: 'textfield', name : 'wdbf_auto_cutt_yorn', hidden : true
										},{ xtype		: 'textfield', name : 'wdbf_auto_weld_yorn', hidden : true
										},{ xtype		: 'textfield', name : 'wdsf_auto_cutt_yorn', hidden : true
										},{ xtype		: 'textfield', name : 'wdsf_auto_weld_yorn', hidden : true
										},{	fieldLabel	: Language.get('rpst_wryp_name', '대표색상' ),
											name		: 'rpst_wryp_name',
											xtype		: 'textfield',
											width		: 300,
											labelWidth	: 70,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=moss_itid]').focus(true, 10);
													}
												}
											}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('wdsf_rate_name','창호형태'),
											xtype		: 'popupfield',
											editable	: false,
											enableKeyEvents : true,
											name		: 'wdsf_rate_name',
											pair		: 'wdtp_idcd',
											clearable	: true,
											width		: 290,
											labelWidth	: 65,
											popup: {
												select : 'SINGLE',
												widget : 'lookup-hntop-type-popup',
												params : { stor_grp : _global.stor_grp },
												result : function(records, nameField, pairField) {
													nameField.setValue(records[0].get('wdtp_name'));
													pairField.setValue(records[0].get('wdtp_idcd'));
													var popup = Ext.ComponentQuery.query('module-estientry2-popup')[0],
														name  = records[0].get('wdtp_name'),
														name2 = '2W'
													;

													//창호형태가 2W인것만 VENT 선택 가능, 선택하지않으면 X로 value set
													if(name.search(name2.toUpperCase()) == '0'){
														popup.down('[name=vent]').setReadOnly(false);
													}else{
														popup.down('[name=vent]').setReadOnly(true);
													}
												}
											},
										},{ xtype		: 'textfield', name : 'wdtp_idcd', hidden : true
										},{	fieldLabel	: '레핑틀림',
											xtype		: 'checkboxgroup',
											width		: 75,
											margin		: '0 0 0 0',
										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,
											items		: [
												{	xtype			: 'checkboxfield',
													labelSeparator	: '',
													allowBlank		: true,
													name			: 'wryp_shio_twis',
													inputValue		: 1,
													width			: 50 ,
												}
											]
										},{	fieldLabel	: '방충망',
											name		: 'moss_itid',
											xtype		: 'textfield',
											width		: 175,
											labelWidth	: 35,
											value		: 'AL SCREEN',
											fieldStyle	: 'text-align: center;',
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=inwp_itid]').focus(true, 10);
													}
												}
											}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '-4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('item_widh', 'W' ),
											name		: 'item_widh',
											xtype		: 'numericfield',
											width		: 155,
											labelWidth	: 66,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=item_hght]').focus(true, 10);
													}
												}
											}
										},{	fieldLabel	: Language.get('item_hght', 'H' ),
											name		: 'item_hght',
											xtype		: 'numericfield',
											labelWidth	: 47,
											width		: 136,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=item_widh_1fst]').focus(true, 10);
													}
												}
											}
										},{	fieldLabel	: '레핑(내부)',
											name		: 'inwp_itid',
											xtype		: 'textfield',
											width		: 300,
											labelWidth	: 70,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=otwp_itid]').focus(true, 10);
													}
												}
											}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('item_widh_1fst', 'W1' ),
											name		: 'item_widh_1fst',
											xtype		: 'numericfield',
											width		: 155,
											labelWidth	: 66,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=item_hght_1fst]').focus(true, 10);
													}
												}
											}
										},{	fieldLabel	: Language.get('item_hght_1fst', 'H1' ),
											name		: 'item_hght_1fst',
											xtype		: 'numericfield',
											width		: 136,
											labelWidth	: 47,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=ispl_name]').focus(true, 10);
													}
												}
											}
										},{	fieldLabel	: '레핑(외부)',
											name		: 'otwp_itid',
											xtype		: 'textfield',
											width		: 300,
											labelWidth	: 70,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=ings_tick]').focus(true, 10);
													}
												}
											}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 -7',
									items	: [
										{	fieldLabel	: 'VENT',
											xtype		: 'radiogroup',
											width		: 30,
											name		: 'vent',
											items: [
												{	boxLabel: '좌', name: 'vent_plac_dvcd', inputValue: 'L', checked: true, margin : '0 8 0 0'
												},{	boxLabel: '우', name: 'vent_plac_dvcd', inputValue: 'R', margin : '0 0 0 8'
												}
											]
										},{	fieldLabel	: '조립',
											xtype		: 'checkboxgroup',
											width		: 78,
											margin		: '0 0 0 171',
											hidden		: true
										},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0, hidden : true,
											items		: [
												{	xtype			: 'checkboxfield',
													labelSeparator	: '',
													allowBlank		: true,
													boxLabel		: '' ,
													name			: '',
													inputValue		: 1,
													width			: 50 ,
												}
											]
										},{	fieldLabel	: Language.get('ings_tick', '유리(내창)' ),
											name		: 'ings_tick',
											xtype		: 'numericfield',
											width		: 115,
											labelWidth	: 50,
											margin		: '0 0 9 288',
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=otgs_tick]').focus(true, 10);
													}
												}
											}
										},{	text		: 'mm',
											xtype		: 'label',
											margin		: '5 0 0 2',
											width		: 10,
											style		:{'font-size':'3px!important'},
											labelStyle	:{'font-size':'3px!important'}
										},{	fieldLabel	: Language.get('otgs_tick', '유리(외창)' ),
											name		: 'otgs_tick',
											xtype		: 'numericfield',
											width		: 135,
											margin		: '0 0 0 0',
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=hndl_hght]').focus(true, 10);
													}
												}
											}
										},{	text		: 'mm',
											xtype		: 'label',
											margin		: '5 0 0 2',
											width		: 20,
											style		:{'font-size':'3px!important'},
											labelStyle	:{'font-size':'3px!important'}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '-7 0 0 -7',
									items	: [
										{	xtype		: 'checkbox',
											boxLabel	: '틀',
											name		: 'wdbf_incl_yorn',
											labelWidth	: 30,
											width		: 80,
											value		: true,
											inputValue	: '1',
											margin		: '0 0 0 80',
										},{	xtype		: 'checkbox',
											boxLabel	: '짝',
											name		: 'wdsf_incl_yorn',
											labelWidth	: 50,
											width		: 80,
											value		: true,
											inputValue	: '1',
										},{	xtype		: 'checkbox',
											boxLabel	: '망',
											name		: 'moss_incl_yorn',
											labelWidth	: 50,
											width		: 80,
											value		: true,
											inputValue	: '1',
										},{	fieldLabel	: '유리금액',
											xtype		: 'radiogroup',
											width		: 200,
											labelWidth	: 45,
											items: [
												{	boxLabel: '제외', name: 'glss_amnt_incl_yorn', inputValue: '0', checked: true
												},{	boxLabel: '포함', name: 'glss_amnt_incl_yorn', inputValue: '1'
												}
											]
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '4 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('ispl_name', '설치위치' ),
											name		: 'ispl_name',
											xtype		: 'textfield',
											width		: 200,
											labelWidth	: 66,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=invc_qntt]').focus(true, 10);
													}
												}
											}
										},{	fieldLabel	: Language.get('invc_qntt', '수량' ),
											name		: 'invc_qntt',
											xtype		: 'numericfield',
											width		: 90,
											labelWidth	: 40,
											value		: '1',
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=rpst_wryp_name]').focus(true, 10);
													}
												}
											}
										},{	fieldLabel	: Language.get('hndl_hght', '핸들높이' ),
											name		: 'hndl_hght',
											xtype		: 'numericfield',
											width		: 155,
											labelWidth	: 66,
											enableKeyEvents : true,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=esti_trff]').focus(true, 10);
													}
												}
											}
										},{	fieldLabel	: Language.get('esti_trff', '견적요율' ),
											name		: 'esti_trff',
											xtype		: 'numericfield',
											width		: 146,
											labelWidth	: 57,
											enableKeyEvents : true,
											listeners:{
												render : function() {
													var me	= this
														val	= Ext.ComponentQuery.query('module-estientry2-worker-editor')[0].down('[name=esti_trff]').getValue()
													;
													if(this.value == null){
														me.setValue(val);
													}
												},
												keydown : function(self, e) {
													if (e.keyCode == e.TAB) {
														me.down('[name=remk_text]').focus(true, 10);
													}
												}
											}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' , padding:'0', border: 0, margin : '5 0 0 0',
									items	: [
										{	fieldLabel	: Language.get('remk_text', '비고' ),
											name		: 'remk_text',
											xtype		: 'textarea',
											width		: 592,
											height		: 38,
											labelWidth	: 65
										}
									]
								}
							]
						},{	xtype	: 'fieldset', layout: 'vbox' , padding:'0', border: 0,
							height	: 465,
							flex	: 3.5,
							items	: [
								{	xtype	: 'image',
									name	: 'image',
									src		: '',
									width	: 330,
									height	: 330,
									style	:  'border : 1px solid #99bce8',
									margin	: '2 0 0 5',
								}
							]
						}
					]
				}
			]
		};
		return item;
	},

	createGrid2 : function() {
		var me = this,
			grid = {
				xtype		: 'tab-panel',
				header		: false,
				region		: 'south',
				itemId		: 'mtrlItem',
				flex		: 8.2,
				items	: [
					{	title	: '한샘',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-estientry2-mtrl-lister',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title	: 'KCC',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-estientry2-mtrl-lister2',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title	: 'WINCHE',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-estientry2-mtrl-lister3',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					},{	title	: '국민창호 (구.다솔)',
						layout	: 'border',
						border	: 0,
						region	: 'center',
						items	: [
							{	xtype	: 'module-estientry2-mtrl-lister4',
								region	: 'center',
								style	: Const.borderLine.top
							}
						]
					}
				]
			}
		;
		return grid;
	},


});

