Ext.define('module.custom.sjflv.mtrl.po.purcordrcost.view.PurcOrdrCostEditor', { extend: 'Axt.form.Editor',

	alias: 'widget.module-purcordrcost-editor',

	height : 370,
	layout : {
		type: 'border'
	},

	title			: Language.get('','입고정산 정보'),
	collapsible 	: true,
	collapsed		: false,
	defaultFocus	: 'hdco_idcd',

	initComponent: function(config) {
		var me = this;
		me.dockedItems = [ me.createDock(), me.createwest()];
		me.callParent(arguments)  ;
	},
	createDock : function () {
		var me = this,
			item = {
				xtype : 'toolbar',
				dock  : 'bottom' ,
				items : [
					'->', '-',
					{ text: Const.UPDATE.text , iconCls: Const.UPDATE.icon , action : Const.UPDATE.action, cls: 'button-style' , hidden : true , itemId: 'update'},
					{ text: Const.CANCEL.text , iconCls: Const.CANCEL.icon , action : Const.CANCEL.action, cls: 'button-style' , hidden : true , itemId: 'cancel'}, '-'
				]
			}
		;
		return item;
	},

	createwest : function () {
		var me = this,
			item = {
				xtype			: 'form-panel',
				dock			: 'left',
				width			: 1750,
				bodyStyle		: { padding: '5px' },
				fieldDefaults	: { width : 315, labelWidth : 100, labelSeparator : '' },
				items			: [
					{	name 	: 'invc_numb', xtype : 'textfield' , hidden : true
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','통관일자'),
								xtype		: 'datefield',
								name		: 'entr_date',
								format		: Const.DATE_FORMAT_YMD_BAR,
								submitFormat: Const.DATE_FORMAT_YMD,
								width		: 205
							},{	text	: '통관금액' , xtype : 'label', style : 'text-align:center;' ,margin: '3 0 0 415',
							},{	text	: '부가세', xtype : 'label', style : 'text-align:center;' ,margin: '3 0 0 70',
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','B/L 운임'),
								xtype		: 'numericfield',
								name		: 'bl_pric_amnt',
								width		: 270,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();


										var	ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
											Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd) + Number(lc_stot_amnt);

											ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
											Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);

										panel.down('[name=ttsm_vatx_amnt]').setValue(ttsm_vatx_amnt);
										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								},
							},{	fieldLabel	: Language.get('','B/L NO'),
								xtype		: 'textfield',
								name		: 'bl_numb',
								width		: 200,
							},{	fieldLabel	: Language.get('','세금'),
								xtype		: 'numericfield',
								margin		: '0 0 0 20',
								name		: 'taxx_amnt',
								width		: 200,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();


										var ttsm_sum = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
														Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd);

											ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
											Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd) + Number(lc_stot_amnt);

											ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
											Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);


										panel.down('[name=ttsm_sum]').setValue(ttsm_sum);
										panel.down('[name=ttsm_vatx_amnt]').setValue(ttsm_vatx_amnt);
										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								},
							},{	name		: 'taxx_vatx',
								xtype		: 'numericfield',
								margin		: '0 0 0 10',
								readOnly	: true,
								width		: 100,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd)  + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);

										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								},
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','L/C, T/T 결재금액'),
								xtype		: 'numericfield',
								name		: 'lc_stot_amnt',
								width		: 270,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();


										var	ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
											Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd)  + Number(lc_stot_amnt);

											ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
											Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);

										panel.down('[name=ttsm_vatx_amnt]').setValue(ttsm_vatx_amnt);
										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								},
							},{	fieldLabel	: Language.get('','결재환율'),
								xtype		: 'numericfield',
								name		: 'exrt',
								width		: 200,
							},{	fieldLabel	: Language.get('','창고,보험료'),
								xtype		: 'numericfield',
								margin		: '0 0 0 20',
								name		: 'wrhs_insu_amnt',
								width		: 200,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_sum = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd);

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd) + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);


										panel.down('[name=ttsm_sum]').setValue(ttsm_sum);
										panel.down('[name=ttsm_vatx_amnt]').setValue(ttsm_vatx_amnt);
										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								},
							},{	name		: 'wrhs_insu_vatx'  ,
								xtype		: 'numericfield',
								readOnly	: true,
								width		: 100,
								margin		: '0 0 0 10',
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd)  + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);

										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','통관수수료'),
								xtype		: 'numericfield',
								margin		: '0 0 0 490',
								name		: 'entr_cmsn_amnt',
								width		: 200,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_sum = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd);

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd) + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);


										panel.down('[name=ttsm_sum]').setValue(ttsm_sum);
										panel.down('[name=ttsm_vatx_amnt]').setValue(ttsm_vatx_amnt);
										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								},
							},{	name		: 'entr_cmsn_vatx',
								xtype		: 'numericfield',
								readOnly	: true,
								width		: 100,
								margin		: '0 0 0 10',
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd)  + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);

										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','운송비'),
								xtype		: 'numericfield',
								margin		: '0 0 0 490',
								name		: 'trnt_exps_amnt',
								width		: 200,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_sum = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd);

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd) + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);


										panel.down('[name=ttsm_sum]').setValue(ttsm_sum);
										panel.down('[name=ttsm_vatx_amnt]').setValue(ttsm_vatx_amnt);
										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								},
							},{	name		: 'trnt_exps_vatx'  ,
								xtype		: 'numericfield',
								readOnly	: true,
								width		: 100,
								margin		: '0 0 0 10',
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd)  + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);

										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','기타#1'),
								xtype		: 'numericfield',
								margin		: '0 0 0 490',
								name		: 'etcc_amnt_1fst',
								width		: 200,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_sum = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd);

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd)  + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);

										panel.down('[name=ttsm_sum]').setValue(ttsm_sum);
										panel.down('[name=ttsm_vatx_amnt]').setValue(ttsm_vatx_amnt);
										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								},
							},{	name		: 'etcc_amnt_1fst_vatx'  ,
								xtype		: 'numericfield',
								readOnly	: true,
								width		: 100,
								margin		: '0 0 0 10',
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd)  + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);

										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','기타#2'),
								xtype		: 'numericfield',
								margin		: '0 0 0 490',
								name		: 'etcc_amnt_2snd',
								width		: 200,
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_sum = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd);

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd) + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);


										panel.down('[name=ttsm_sum]').setValue(ttsm_sum);
										panel.down('[name=ttsm_vatx_amnt]').setValue(ttsm_vatx_amnt);
										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								},
							},{	name		: 'etcc_amnt_2snd_vatx'  ,
								xtype		: 'numericfield',
								readOnly	: true,
								width		: 100,
								margin		: '0 0 0 10',
								listeners	: {
									blur:function(field){
										var panel = this.up('form');
										var etcc_amnt_1fst = panel.down('[name=etcc_amnt_1fst]').getValue();
											taxx_amnt = panel.down('[name=taxx_amnt]').getValue();
											wrhs_insu_amnt = panel.down('[name=wrhs_insu_amnt]').getValue();
											entr_cmsn_amnt = panel.down('[name=entr_cmsn_amnt]').getValue();
											trnt_exps_amnt = panel.down('[name=trnt_exps_amnt]').getValue();
											etcc_amnt_2snd = panel.down('[name=etcc_amnt_2snd]').getValue();

											taxx_vatx = panel.down('[name=taxx_vatx]').getValue();
											wrhs_insu_vatx = panel.down('[name=wrhs_insu_vatx]').getValue();
											entr_cmsn_vatx = panel.down('[name=entr_cmsn_vatx]').getValue();
											trnt_exps_vatx = panel.down('[name=trnt_exps_vatx]').getValue();
											etcc_amnt_1fst_vatx = panel.down('[name=etcc_amnt_1fst_vatx]').getValue();
											etcc_amnt_2snd_vatx = panel.down('[name=etcc_amnt_2snd_vatx]').getValue();

											bl_pric_amnt = panel.down('[name=bl_pric_amnt]').getValue();
											lc_stot_amnt = panel.down('[name=lc_stot_amnt]').getValue();

										var

										ttsm_vatx_amnt = Number(taxx_amnt) + Number(wrhs_insu_amnt) + Number(entr_cmsn_amnt) + Number(trnt_exps_amnt) +
										Number(etcc_amnt_1fst) + Number(etcc_amnt_2snd)  + Number(lc_stot_amnt);

										ttsm_amnt = ttsm_vatx_amnt - Number(taxx_vatx) - Number(wrhs_insu_vatx) - Number(entr_cmsn_vatx) -
										Number(trnt_exps_vatx) - Number(etcc_amnt_1fst_vatx) - Number(etcc_amnt_2snd_vatx);

										panel.down('[name=ttsm_amnt]').setValue(ttsm_amnt);
									}
								}
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','총금액'),
								xtype		: 'numericfield',
								margin		: '0 0 0 490',
								fieldCls	: 'readonlyfield',
								readOnly	: true,
								name		: 'ttsm_sum',
								width		: 200,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','총비용'),
								xtype		: 'numericfield',
								margin		: '0 0 0 490',
								fieldCls	: 'readonlyfield',
								name		: 'ttsm_vatx_amnt',
								readOnly	: true,
								width		: 200,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','총비용 (부가세제외)'),
								xtype		: 'numericfield',
								margin		: '0 0 0 490',
								fieldCls	: 'readonlyfield',
								readOnly	: true,
								name		: 'ttsm_amnt',
								width		: 200,
							}
						]
					},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 5 0',
						items	: [
							{	fieldLabel	: Language.get('','비고'),
								name		: 'remk_text'  ,
								xtype		: 'textfield',
								width		: 795,
								margin		: '0 0 5 5',
							}
						]
					}
				]
			}
		;
		return item;
	},

});