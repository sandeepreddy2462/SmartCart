import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules
import matplotlib.pyplot as plt
import os

def show_columns(data):
    return data.columns.tolist()

def clean_data(data):
    data = data.dropna(subset=['Itemname'])
    data = data.drop_duplicates()
    data = data[(data['Quantity'] > 0) & (data['Price'] > 0)]
    data['Date'] = pd.to_datetime(data['Date'], format='%d.%m.%Y %H:%M')
    data['Quantity'] = data['Quantity'].astype(int)
    return data


def plot_sales_trend(sales_data, output_path='static/sales_trend.jpg'):
    plt.figure(figsize=(10, 6))
    pd.Series(sales_data).plot(kind='line', color='royalblue')
    plt.title('Sales Over Time')
    plt.xlabel('Date')
    plt.ylabel('Total Quantity Sold')
    plt.tight_layout()

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    plt.savefig(output_path)
    plt.close()
    return output_path 

def get_top_products(data):
    return data['Itemname'].value_counts().head(10).to_dict()

def get_sales_over_time(data):
    sales = data.set_index('Date').resample('M')['Quantity'].sum()
    return {k.strftime('%Y-%m'): int(v) for k, v in sales.items()}

def get_transaction_size_distribution(data):
    transaction_size = data.groupby('BillNo')['Itemname'].nunique()
    return transaction_size.describe().to_dict()

def get_apriori_recommendations(data):
    # Optional country filter
    if 'Country' in data.columns:
        data = data[data['Country'] == 'France']

    if data.empty:
        return []

    basket = data.groupby(['BillNo', 'Itemname'])['Quantity'].sum().unstack().reset_index().fillna(0).set_index('BillNo')
    basket = basket.map(lambda x: 1 if x > 0 else 0)

    frequent_itemsets = apriori(basket, min_support=0.05, use_colnames=True)
    if frequent_itemsets.empty:
        return []

    rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1)
    # rules = rules[(rules['lift'] >= 6) & (rules['confidence'] >= 0.8)]

    rules_list = []
    for _, row in rules.iterrows():
        rules_list.append({
            'antecedents': list(row['antecedents']),
            'consequents': list(row['consequents']),
            'confidence': float(row['confidence']),
            'lift': float(row['lift'])
        })
    return rules_list


def generate_recommendations(customer_items, rules):
    recommendations = []
    for item in customer_items:
        for _, row in rules.iterrows():
            if item in list(row['antecedents']):
                recommendations.extend(list(row['consequents']))
    return list(set(recommendations))


def generate_all_insights(data):
    data = clean_data(data)

    # Prepare each insight
    top_products = get_top_products(data)
    sales_over_time = get_sales_over_time(data)
    transaction_summary = get_transaction_size_distribution(data)
    recommendations = get_apriori_recommendations(data)

    return {
        'top_products': top_products,
        'sales_over_time': sales_over_time,
        'transaction_summary': transaction_summary,
        'recommendations': recommendations
    }

