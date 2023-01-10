from rest_framework import serializers

from apps.report.models import Report, ReportPT, ReportPTMango, ReportPTPineapple, ReportPTGoldenberry, \
    ReportPTBlueberry


class ReportSerializer(serializers.ModelSerializer):
    maquila_name = serializers.CharField(source='lot.maquila.name', read_only=True)
    avg_box = serializers.CharField(source='get_avg_box', read_only=True)
    provider = serializers.CharField(source='get_provider', read_only=True)
    lot = serializers.CharField(source='get_lot', read_only=True)
    provider_guide = serializers.CharField(source='get_provider_guide', read_only=True)
    carrier_guide = serializers.CharField(source='get_carrier_guide', read_only=True)
    entry_date = serializers.CharField(source='get_entry_date', read_only=True)
    download_date = serializers.CharField(source='get_download_date', read_only=True)
    year = serializers.CharField(source='get_year', read_only=True)
    month = serializers.CharField(source='get_month', read_only=True)
    week = serializers.CharField(source='get_week', read_only=True)
    total_amount = serializers.CharField(source='get_total_amount', read_only=True)
    price_plant = serializers.CharField(source='get_price_plant', read_only=True)
    brute_weight = serializers.CharField(source='get_brute_weight', read_only=True)
    origin = serializers.CharField(source='get_origin', read_only=True)
    parcel = serializers.CharField(source='get_parcel', read_only=True)
    number_boxes = serializers.CharField(source='get_quantity_boxes', read_only=True)
    net_weight = serializers.CharField(source='get_net_weight', read_only=True)
    discount_soles = serializers.CharField(source='get_discount_soles', read_only=True)
    kg_usable = serializers.CharField(source='get_kg_usable', read_only=True)
    kg_discounted = serializers.CharField(source='get_kg_discounted', read_only=True)
    net_difference = serializers.CharField(source='get_net_difference', read_only=True)
    tare = serializers.CharField(source='get_tare', read_only=True)
    weight_guide = serializers.CharField(source='get_weight_guide', read_only=True)
    condition = serializers.CharField(source='get_condition', read_only=True)
    variety = serializers.CharField(source='get_variety', read_only=True)
    departure_time = serializers.CharField(source='lot.get_departure_time', read_only=True)
    arrival_time = serializers.CharField(source='lot.get_arrival_time', read_only=True)
    discount_percentage = serializers.CharField(source='get_discount_percentage', read_only=True)
    driver = serializers.CharField(source='lot.get_driver', read_only=True)
    carrier = serializers.CharField(source='lot.get_carrier', read_only=True)
    code = serializers.CharField(source='lot.get_carrier_code', read_only=True)
    invoice= serializers.CharField(source='lot.invoice_code', read_only=True)

    class Meta:
        model = Report
        fields = '__all__'


class ReportPTSerializer(serializers.ModelSerializer):
    percentage_discarded = serializers.CharField(source='get_percentage_discarded', read_only=True)
    net_weight = serializers.CharField(source='get_net_weight', read_only=True)
    percentage_merma = serializers.CharField(source='get_percentage_merma', read_only=True)

    class Meta:
        model = ReportPT
        fields = '__all__'


class ReportPTMangoSerializer(ReportPTSerializer):
    week = serializers.CharField(source='lot.get_week', read_only=True)
    month = serializers.CharField(source='lot.get_month', read_only=True)
    guide = serializers.CharField(source='lot.providerGuide', read_only=True)
    invoice = serializers.CharField(source='lot.invoice_code', read_only=True)
    entryDate = serializers.CharField(source='lot.entryDate', read_only=True)
    variety = serializers.CharField(source='lot.variety', read_only=True)
    condition = serializers.CharField(source='lot.condition', read_only=True)
    lot = serializers.CharField(source='lot.lot', read_only=True)
    provider = serializers.CharField(source='lot.get_provider_name', read_only=True)
    origin = serializers.CharField(source='lot.origin', read_only=True)
    kg_guide = serializers.CharField(source='lot.weight_guide', read_only=True)
    kg_net = serializers.CharField(source='lot.get_total_net_weight', read_only=True)
    discount_percentage = serializers.FloatField(source='lot.discount_percentage', read_only=True)
    dehydrated = serializers.CharField(source='get_dehydrated', read_only=True)
    percentage_shell = serializers.CharField(source='get_percentage_shell', read_only=True)
    kg_enabled = serializers.CharField(source='get_kg_enabled', read_only=True)
    percentage_enabled = serializers.CharField(source='get_percentage_enabled', read_only=True)
    kg_pt = serializers.CharField(source='get_kg_pt', read_only=True)
    performance_usable = serializers.CharField(source='get_performance_usable', read_only=True)
    performance_net = serializers.CharField(source='get_performance_net', read_only=True)
    kg_usable = serializers.FloatField(source='get_kg_usable', read_only=True)

    class Meta:
        model = ReportPTMango
        fields = ('week', 'month', 'guide', 'invoice', 'entryDate', 'date_process',
                                                                    'variety', 'condition', 'lot', 'provider', 'origin',
                  'kg_guide', 'kg_net',
                  'discount_percentage', 'kg_usable',
                  'kg_processed', 'dehydrated', 'kg_discarded', 'percentage_discarded',
                  'net_weight', 'shell', 'percentage_shell', 'merma', 'percentage_merma',
                  'kg_enabled', 'percentage_enabled', 'kg_pt',
                  'retail_slices',
                  'retail_cachetes',
                  'retail_chunks',
                  'retail_cubs',
                  'granel_slices',
                  'granel_cachetes',
                  'granel_chunks',
                  'granel_cubs', 'recoverable', 'performance_usable', 'performance_net', 'target')


class ReportPTPineappleSerializer(ReportPTSerializer):
    week = serializers.CharField(source='lot.get_week', read_only=True)
    month = serializers.CharField(source='lot.get_month', read_only=True)
    guide = serializers.CharField(source='lot.providerGuide', read_only=True)
    invoice = serializers.CharField(source='lot.invoice_code', read_only=True)
    entryDate = serializers.CharField(source='lot.entryDate', read_only=True)
    variety = serializers.CharField(source='lot.variety', read_only=True)
    condition = serializers.CharField(source='lot.condition', read_only=True)
    lot = serializers.CharField(source='lot.lot', read_only=True)
    provider = serializers.CharField(source='lot.get_provider_name', read_only=True)
    origin = serializers.CharField(source='lot.origin', read_only=True)
    kg_guide = serializers.CharField(source='lot.weight_guide', read_only=True)
    kg_net = serializers.CharField(source='lot.get_total_net_weight', read_only=True)
    discount_percentage = serializers.FloatField(source='lot.discount_percentage', read_only=True)

    dehydrated = serializers.CharField(source='get_dehydrated', read_only=True)
    percentage_crown = serializers.CharField(source='get_percentage_crown', read_only=True)
    percentage_shell = serializers.CharField(source='get_percentage_shell', read_only=True)
    percentage_juice_pulp = serializers.CharField(source='get_percentage_juice_pulp', read_only=True)
    kg_enabled = serializers.CharField(source='get_kg_enabled', read_only=True)
    percentage_enabled = serializers.CharField(source='get_percentage_enabled', read_only=True)
    kg_pt = serializers.CharField(source='get_kg_pt', read_only=True)
    performance_usable = serializers.CharField(source='get_performance_usable', read_only=True)
    performance_net = serializers.CharField(source='get_performance_net', read_only=True)
    kg_usable = serializers.FloatField(source='get_kg_usable', read_only=True)

    class Meta:
        model = ReportPTPineapple
        fields = ('week', 'month', 'guide', 'invoice', 'entryDate', 'date_process',
                                                                    'variety', 'condition', 'lot', 'provider', 'origin',
                  'kg_guide', 'kg_net',
                  'discount_percentage', 'kg_usable',
                  'kg_processed', 'dehydrated', 'kg_discarded', 'percentage_discarded',
                  'net_weight', 'crown', 'percentage_crown', 'shell', 'percentage_shell',
                  'juice_pulp', 'percentage_juice_pulp', 'merma', 'percentage_merma',
                  'kg_enabled', 'percentage_enabled', 'kg_pt',
                  'retail_rings',
                  'retail_1_8',
                  'retail_1_16',
                  'granel_rings',
                  'granel_1_8',
                  'granel_1_16',
                  'performance_usable', 'performance_net', 'target')


class ReportPTBananaSerializer(ReportPTSerializer):
    week = serializers.CharField(source='lot.get_week', read_only=True)
    month = serializers.CharField(source='lot.get_month', read_only=True)
    guide = serializers.CharField(source='lot.providerGuide', read_only=True)
    invoice = serializers.CharField(source='lot.invoice_code', read_only=True)
    entryDate = serializers.CharField(source='lot.entryDate', read_only=True)
    variety = serializers.CharField(source='lot.variety', read_only=True)
    condition = serializers.CharField(source='lot.condition', read_only=True)
    lot = serializers.CharField(source='lot.lot', read_only=True)
    provider = serializers.CharField(source='lot.get_provider_name', read_only=True)
    origin = serializers.CharField(source='lot.origin', read_only=True)
    kg_guide = serializers.CharField(source='lot.weight_guide', read_only=True)
    kg_net = serializers.CharField(source='lot.get_total_net_weight', read_only=True)
    discount_percentage = serializers.FloatField(source='lot.discount_percentage', read_only=True)
    dehydrated = serializers.CharField(source='get_dehydrated', read_only=True)
    percentage_shell = serializers.CharField(source='get_percentage_shell', read_only=True)
    kg_enabled = serializers.CharField(source='get_kg_enabled', read_only=True)
    percentage_enabled = serializers.CharField(source='get_percentage_enabled', read_only=True)
    kg_pt = serializers.CharField(source='get_kg_pt', read_only=True)
    performance_usable = serializers.CharField(source='get_performance_usable', read_only=True)
    performance_net = serializers.CharField(source='get_performance_net', read_only=True)
    kg_usable = serializers.FloatField(source='get_kg_usable', read_only=True)

    class Meta:
        fields = ('week', 'month', 'guide', 'invoice', 'entryDate', 'date_process',
                                                                    'variety', 'condition', 'lot', 'provider', 'origin',
                  'kg_guide', 'kg_net',
                  'discount_percentage', 'kg_usable',
                  'kg_processed', 'dehydrated', 'kg_discarded', 'percentage_discarded',
                  'net_weight', 'shell', 'percentage_shell', 'merma', 'percentage_merma',
                  'kg_enabled', 'percentage_enabled', 'kg_pt',
                  'retail_slices',
                  'retail_coins',
                  'granel_slices',
                  'granel_coins',
                  'performance_usable', 'performance_net', 'target')


class ReportPTGoldenberrySerializer(ReportPTSerializer):
    week = serializers.CharField(source='lot.get_week', read_only=True)
    month = serializers.CharField(source='lot.get_month', read_only=True)
    guide = serializers.CharField(source='lot.providerGuide', read_only=True)
    invoice = serializers.CharField(source='lot.invoice_code', read_only=True)
    entryDate = serializers.CharField(source='lot.entryDate', read_only=True)
    variety = serializers.CharField(source='lot.variety', read_only=True)
    condition = serializers.CharField(source='lot.condition', read_only=True)
    lot = serializers.CharField(source='lot.lot', read_only=True)
    provider = serializers.CharField(source='lot.get_provider_name', read_only=True)
    origin = serializers.CharField(source='lot.origin', read_only=True)
    kg_guide = serializers.CharField(source='lot.weight_guide', read_only=True)
    kg_net = serializers.CharField(source='lot.get_total_net_weight', read_only=True)
    discount_percentage = serializers.FloatField(source='lot.discount_percentage', read_only=True)
    dehydrated = serializers.CharField(source='get_dehydrated', read_only=True)
    percentage_caliz = serializers.CharField(source='get_percentage_caliz', read_only=True)
    kg_enabled = serializers.CharField(source='get_kg_enabled', read_only=True)
    percentage_enabled = serializers.CharField(source='get_percentage_enabled', read_only=True)
    kg_pt = serializers.CharField(source='get_kg_pt', read_only=True)
    performance_usable = serializers.CharField(source='get_performance_usable', read_only=True)
    performance_net = serializers.CharField(source='get_performance_net', read_only=True)
    kg_usable = serializers.FloatField(source='get_kg_usable', read_only=True)

    class Meta:
        model = ReportPTGoldenberry
        fields = ('week', 'month', 'guide', 'invoice', 'entryDate', 'date_process',
                                                                    'variety', 'condition', 'lot', 'provider', 'origin',
                  'kg_guide', 'kg_net',
                  'discount_percentage', 'kg_usable',
                  'kg_processed', 'dehydrated', 'kg_discarded', 'percentage_discarded',
                  'net_weight', 'caliz', 'percentage_caliz', 'merma', 'percentage_merma',
                  'kg_enabled', 'percentage_enabled', 'kg_pt',
                  'retail_whole',
                  'retail_halves',
                  'retail_chunks',
                  'retail_quarter',
                  'granel_whole',
                  'granel_halves',
                  'granel_quarter',
                  'performance_usable', 'performance_net', 'target')


class ReportPTBlueberrySerializer(ReportPTSerializer):
    week = serializers.CharField(source='lot.get_week', read_only=True)
    month = serializers.CharField(source='lot.get_month', read_only=True)
    guide = serializers.CharField(source='lot.providerGuide', read_only=True)
    invoice = serializers.CharField(source='lot.invoice_code', read_only=True)
    entryDate = serializers.CharField(source='lot.entryDate', read_only=True)
    variety = serializers.CharField(source='lot.variety', read_only=True)
    condition = serializers.CharField(source='lot.condition', read_only=True)
    lot = serializers.CharField(source='lot.lot', read_only=True)
    provider = serializers.CharField(source='lot.get_provider_name', read_only=True)
    origin = serializers.CharField(source='lot.origin', read_only=True)
    kg_guide = serializers.CharField(source='lot.weight_guide', read_only=True)
    kg_net = serializers.CharField(source='lot.get_total_net_weight', read_only=True)
    discount_percentage = serializers.FloatField(source='lot.discount_percentage', read_only=True)
    dehydrated = serializers.CharField(source='get_dehydrated', read_only=True)
    kg_enabled = serializers.CharField(source='get_kg_enabled', read_only=True)
    percentage_enabled = serializers.CharField(source='get_percentage_enabled', read_only=True)
    kg_pt = serializers.CharField(source='get_kg_pt', read_only=True)
    performance_usable = serializers.CharField(source='get_performance_usable', read_only=True)
    performance_net = serializers.CharField(source='get_performance_net', read_only=True)
    kg_usable = serializers.FloatField(source='get_kg_usable', read_only=True)

    class Meta:
        model = ReportPTBlueberry
        fields = ('week', 'month', 'guide', 'invoice', 'entryDate', 'date_process',
                                                                    'variety', 'condition', 'lot', 'provider', 'origin',
                  'kg_guide', 'kg_net',
                  'discount_percentage', 'kg_usable',
                  'kg_processed', 'dehydrated', 'kg_discarded', 'percentage_discarded',
                  'net_weight', 'merma', 'percentage_merma',
                  'kg_enabled', 'percentage_enabled', 'kg_pt',
                  'retail_whole',
                  'retail_halves',
                  'granel_whole',
                  'granel_halves',
                  'performance_usable', 'performance_net', 'target')
